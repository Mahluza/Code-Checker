import CodeMatch from './CodeMatch'
import FileMatch from './FileMatch'
import FileModel from '../content/FileModel'
import ISyntaxTreeNode from '../content/ISyntaxTreeNode'
import SubmissionMatch from './SubmissionMatch'
import { MatchType } from '../schema/MatchType'
import e = require('express')
import { LINE_THRESHOLD_FOR_CODEMATCH, PERCENTAGE_THRESHOLD_FOR_CODEMATCH } from '../config/threshold'

/**
 * Utility to compute similarity for SubmissionMatch.
 * Gives info about overall match between two user submissions.
 *
 * @param submissionMatch SubmissionMatch holding matches between two user submissions
 */
export function computeSimilarityPercentageBetweenSubmissions(submissionMatch: SubmissionMatch) {
  let overallCommonLines: number = 0
  let overallFileLines: number = 0
  submissionMatch.getFileMatches().map((fileMatch) => {
    overallCommonLines += fileMatch.getCommonLines()
    let file1 = fileMatch.getFile1().getSyntaxTree()
    let file2 = fileMatch.getFile2().getSyntaxTree()
    let linesInFile1 = file1.getEndLineNumber() - file1.getStartLineNumber() + 1
    let linesInFile2 = file2.getEndLineNumber() - file2.getStartLineNumber() + 1
    overallFileLines += Math.min(linesInFile1, linesInFile2)
  })
  if (overallCommonLines === 0) {
    return 0
  }
  return Math.ceil((overallCommonLines / overallFileLines) * 100)
}

/**
 * Utility to identify similarities between files of two users
 *
 * @param submissionMatch Submission Match for the user
 * @param file1 File belonging user1
 * @param file2 File belonging user2
 */
export function findSimilarities(submissionMatch: SubmissionMatch, file1: FileModel, file2: FileModel): FileMatch {
  let fileMatch = new FileMatch(file1, file2)
  let syntaxTree1: ISyntaxTreeNode = file1.getSyntaxTree()
  let syntaxTree2: ISyntaxTreeNode = file2.getSyntaxTree()
  checkMatch(fileMatch, syntaxTree1, syntaxTree2)
  if (fileMatch.getCodeMatches().length) {
    setSimilarlyPercentageForFile(fileMatch)
    submissionMatch.addFileMatch(fileMatch)
  }
  return fileMatch
}

/**
 * To compute similarity for file match
 *
 * @param fileMatch FileMatch
 */
function setSimilarlyPercentageForFile(fileMatch: FileMatch): void {
  let commonLines: number = 0
  fileMatch.getCodeMatches().map((codeMatch) => {
    let matches = codeMatch.getCodeMatch()
    if (matches.type === MatchType.CommonLines) {
      commonLines += matches.lines.length
    } else {
      commonLines += matches.rangeOfNode1[1] - matches.rangeOfNode1[0]
    }
  })
  fileMatch.setCommonLines(commonLines)
  if (commonLines === 0) {
    //If nothing in common between files
    fileMatch.setSimilarityPercentage(0)
    return
  }
  let file1 = fileMatch.getFile1().getSyntaxTree()
  let file2 = fileMatch.getFile2().getSyntaxTree()
  let linesInFile1 = file1.getEndLineNumber() - file1.getStartLineNumber() + 1
  let linesInFile2 = file2.getEndLineNumber() - file2.getStartLineNumber() + 1
  fileMatch.setSimilarityPercentage(computeSimilarityPercentage(commonLines, linesInFile1, linesInFile2))
}

/**
 * Generic function to compute similarity for given common number of lines and number of lines in each node/file.
 *
 * @param commonLines Number of common lines
 * @param linesInNode1 Number of lines in node 1
 * @param linesInNode2 Number of lines in node 2
 */
function computeSimilarityPercentage(commonLines: number, linesInNode1: number, linesInNode2: number): number {
  if (commonLines === 0) {
    //not even single match
    return 0
  }
  let minLines = Math.min(linesInNode1, linesInNode2)
  return Math.ceil((commonLines / minLines) * 100)
}

/**
 * Helper to identify matches across two files or two nodes.
 *
 * @param fileMatch FileMatch to hold all the matches between file1(or node1 of file1) and file2(or node2 of file2)
 * @param node1 node representing file1
 * @param node2 node representing file2
 */
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
    if (matchedLines.length > LINE_THRESHOLD_FOR_CODEMATCH) {
      let linesIn1 = innerNodes1.filter(
        (innerNode1) => innerNode1.getStartLineNumber() === innerNode1.getEndLineNumber()
      ).length
      let linesIn2 = innerNodes2.filter(
        (innerNode2) => innerNode2.getStartLineNumber() === innerNode2.getEndLineNumber()
      ).length
      let similarityPercentage = computeSimilarityPercentage(matchedLines.length, linesIn1, linesIn2)
      //If similarity is high enough as per our config then add to file match else ignore
      if (similarityPercentage > PERCENTAGE_THRESHOLD_FOR_CODEMATCH) {
        fileMatch.addCodeMatch(new CodeMatch(node1, node2, similarityPercentage, matchedLines))
      }
    }
  } else {
    //not relevant to compare
    return
  }
}
