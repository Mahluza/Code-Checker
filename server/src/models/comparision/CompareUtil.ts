import { SyntaxKind } from 'ts-morph'
import { HashString } from '../schema/HashString'
import CodeMatch from './CodeMatch'
import FileMatch from './FileMatch'
import FileModel from '../content/FileModel'
import ISyntaxTreeNode from '../content/ISyntaxTreeNode'

function getHashValuesForNode(node: ISyntaxTreeNode): HashString[] {
  let hashStrings: HashString[] = []
  node.getChildren().map((n) => {
    if (n.isIntermediate()) {
      hashStrings.push(...getHashValuesForNode(n))
    } else {
      //TODO: If we keep hash for functions, class this might change
      hashStrings.push(n.getHashCode())
    }
  })
  return hashStrings
}

export function findSimilarities(file1: FileModel, file2: FileModel): FileMatch {
  let fileMatch = new FileMatch(file1, file2)
  let syntaxTree1: ISyntaxTreeNode = file1.getSyntaxTree()
  let syntaxTree2: ISyntaxTreeNode = file2.getSyntaxTree()
  checkMatch(fileMatch, syntaxTree1, syntaxTree2)
  let hashValues1 = getHashValuesForNode(syntaxTree1)
  let hashValues2 = getHashValuesForNode(syntaxTree2)
  return fileMatch
}

function computeSimilarlyPercentage(commonLines: number, linesInNode1: number, linesInNode2: number): number {
  let minLines = Math.min(linesInNode1, linesInNode2)
  return Math.ceil((commonLines / minLines) * 100)
}

function checkMatch(fileMatch: FileMatch, node1: ISyntaxTreeNode, node2: ISyntaxTreeNode): [number, number] {
  if (node1.getHashCode() === node2.getHashCode()) {
    let linesInNode1: number = node1.getStartLineNumber() - node1.getEndLineNumber() + 1
    let linesInNode2: number = node2.getStartLineNumber() - node2.getEndLineNumber() + 1
    if (linesInNode1 == 1 && linesInNode2 == 1) {
      //a single line match
      return [node1.getStartLineNumber(), node2.getStartLineNumber()]
    } else {
      // anything other than a line - example class or function complete match
      let similarltyPercentage = 100
      fileMatch.addCodeMatch(new CodeMatch(node1, node2, similarltyPercentage))
    }
  } else if (node1.getNodeType() === node2.getNodeType() && node1.getChildren() && node2.getChildren()) {
    let matchedLines: Array<[number, number]> = []
    let innerNodes1 = node1.getChildren()
    let innerNodes2 = node2.getChildren()
    let seenNodesIn1: ISyntaxTreeNode[] = []
    let seenNodesIn2: ISyntaxTreeNode[] = []
    for (let i = 0; i < innerNodes1.length; i++) {
      for (let j = 0; j < innerNodes2.length; j++) {
        let innerNode1 = innerNodes1[i]
        let innerNode2 = innerNodes2[j]
        if (seenNodesIn1.includes(innerNode1)) {
          break
        }
        if (seenNodesIn2.includes(innerNode2)) {
          continue
        }
        let innerMatchResults = checkMatch(fileMatch, innerNode1, innerNode2)
        if (innerMatchResults) {
          seenNodesIn1.push(innerNode1)
          seenNodesIn2.push(innerNode2)
          matchedLines.push(innerMatchResults)
        }
      }
    }
    if (matchedLines.length > 0) {
      let linesIn1 = innerNodes1.filter(
        (innerNode1) => innerNode1.getStartLineNumber() === innerNode1.getEndLineNumber()
      ).length
      let linesIn2 = innerNodes2.filter(
        (innerNode2) => innerNode2.getStartLineNumber() === innerNode2.getEndLineNumber()
      ).length
      let similarltyPercentage = computeSimilarlyPercentage(matchedLines.length, linesIn1, linesIn2)
      fileMatch.addCodeMatch(new CodeMatch(node1, node2, similarltyPercentage, matchedLines))
    }
  } else {
    return
  }
}
