import { SyntaxKind } from 'ts-morph'
import { HashString } from '../schema/HashString'
import CodeMatch from './CodeMatch'
import FileMatch from './FileMatch'
import FileModel from './fileModel'
import ISyntaxTreeNode from './ISyntaxTreeNode'

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

function findMatch(hashValues1: HashString[], hashValues2: HashString[]) {
  //TODO: This is inefficient. change implementation later
  return hashValues1.filter((value) => hashValues2.includes(value)).length
}

export function findSimilarities(file1: FileModel, file2: FileModel): FileMatch {
  let fileMatch = new FileMatch(file1, file2)
  let syntaxTree1: ISyntaxTreeNode = file1.getSyntaxTree()
  let syntaxTree2: ISyntaxTreeNode = file2.getSyntaxTree()
  checkMatch(fileMatch, syntaxTree1, syntaxTree2)
  let hashValues1 = getHashValuesForNode(syntaxTree1)
  let hashValues2 = getHashValuesForNode(syntaxTree2)
  findMatch(hashValues1, hashValues2)
  return fileMatch
}

function computeSimilarlyPercentage(linesInNode1: number, linesInNode2: number) {
  //TODO: Compute similarly
  return 100
}

function checkMatch(fileMatch: FileMatch, node1: ISyntaxTreeNode, node2: ISyntaxTreeNode) {
  if (node1.getHashCode() === node2.getHashCode()) {
    let linesInNode1: number = node1.getStartLineNumber() - node1.getEndLineNumber() + 1
    let linesInNode2: number = node2.getStartLineNumber() - node2.getEndLineNumber() + 1
    let similarltyPercently = computeSimilarlyPercentage(linesInNode1, linesInNode2)
    fileMatch.addCodeMatch(new CodeMatch(node1, node2, similarltyPercently))
  }
}
