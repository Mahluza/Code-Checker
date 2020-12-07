import CodeMatch from './CodeMatch'
import FileMatch from './FileMatch'
import FileModel from '../content/FileModel'
import ISyntaxTreeNode from '../content/ISyntaxTreeNode'
import SubmissionMatch from './SubmissionMatch'
import { MatchType } from '../schema/MatchType'
import { LINE_THRESHOLD_FOR_CODEMATCH, PERCENTAGE_THRESHOLD_FOR_CODEMATCH } from '../config/threshold'

/**
 * Utility to compute similarity for SubmissionMatch.
 * Gives info about overall match between two user submissions.
 *
 * @param submissionMatch SubmissionMatch holding matches between two user submissions
 */
export function computeSimilarityPercentageBetweenSubmissions(submissionMatch: SubmissionMatch) {
  let filesDetails: [Map<string, number>, Map<string, number>] = [new Map(), new Map()]
  let commonlineDetails: [Map<string, Set<number>>, Map<string, Set<number>>] = [new Map(), new Map()]
  submissionMatch.getFileMatches().map((fileMatch) => {
    let file1 = fileMatch.getFile1()
    let file2 = fileMatch.getFile2()
    if (!filesDetails[0].has(file1.getName())) {
      filesDetails[0].set(file1.getName(), file1.getNumberOfStatements())
    }
    if (!filesDetails[1].has(file2.getName())) {
      filesDetails[1].set(file2.getName(), file2.getNumberOfStatements())
    }
    let commonLines: [Set<number>, Set<number>] = getCommonLines(fileMatch)
    updateCommonLines(commonlineDetails[0], file1.getName(), commonLines[0])
    updateCommonLines(commonlineDetails[1], file2.getName(), commonLines[1])
  })
  let user1TotalLines = Array.from(filesDetails[0].values()).reduce((acc, v) => acc + v, 0)
  let user2TotalLines = Array.from(filesDetails[1].values()).reduce((acc, v) => acc + v, 0)
  let commonLinesInUser1 = Array.from(commonlineDetails[0].values()).reduce((acc, v) => acc + v.size, 0)
  let commonLinesInUser2 = Array.from(commonlineDetails[1].values()).reduce((acc, v) => acc + v.size, 0)
  return computeSimilarityPercentage(user1TotalLines, user2TotalLines, commonLinesInUser1, commonLinesInUser2)
}

/**
 * Helper function to compute similarity percentage based on overall lines and the common lines.
 *
 * @param overallLines1 Number of lines in node 1
 * @param overallLines2 Number of lines in node 2
 * @param commonLines1 Common lines in node 1
 * @param commonLines2 Common lines in node 2
 */
function computeSimilarityPercentage(
  overallLines1: number,
  overallLines2: number,
  commonLines1: number,
  commonLines2: number
): number {
  if (commonLines1 === 0) {
    return 0
  }
  //whichever file has less number of lines using that as reference
  if (overallLines1 < overallLines2) {
    return Math.ceil((commonLines1 / overallLines1) * 100)
  } else {
    return Math.ceil((commonLines2 / overallLines2) * 100)
  }
}

/**
 * Helper function to add the common lines information to file
 *
 * @param mapping map representing the file and its common lines
 * @param name name of the file
 * @param commonLines common lines of the file
 */
function updateCommonLines(mapping: Map<string, Set<number>>, name: string, commonLines: Set<number>) {
  if (mapping.has(name)) {
    //if file is already present add the line numbers
    let updatedCommonLines: Set<number> = new Set([...mapping.get(name), ...commonLines])
    mapping.set(name, updatedCommonLines)
  } else {
    mapping.set(name, commonLines)
  }
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
 * Helper function to get common lines from the file match.
 * @param fileMatch file match for which common lines are to found
 */
function getCommonLines(fileMatch: FileMatch): [Set<number>, Set<number>] {
  let commonLines: [Set<number>, Set<number>] = [new Set(), new Set()]
  fileMatch.getCodeMatches().map((codeMatch) => {
    let match = codeMatch.getCodeMatch()
    if (match.type === MatchType.CommonLines) {
      //only if few lines matched
      match.lines.map((matched_line) => {
        commonLines[0].add(matched_line[0])
        commonLines[1].add(matched_line[1])
      })
    } else {
      let commentLinesIn1 = match.node1.getCommentLinesInNode()
      let commentLinesIn2 = match.node2.getCommentLinesInNode()
      //if a block is matched store info about all lines
      for (let i = match.rangeOfNode1[0]; i <= match.rangeOfNode1[1]; i++) {
        if (!commentLinesIn1.includes(i)) {
          commonLines[0].add(i)
        }
      }
      for (let i = match.rangeOfNode2[0]; i <= match.rangeOfNode2[1]; i++) {
        if (!commentLinesIn2.includes(i)) {
          commonLines[1].add(i)
        }
      }
    }
  })
  return commonLines
}

/**
 * To compute similarity for file match
 *
 * @param fileMatch FileMatch
 */
function setSimilarlyPercentageForFile(fileMatch: FileMatch): void {
  let commonLines: [Set<number>, Set<number>] = getCommonLines(fileMatch)
  let linesInFile = []
  linesInFile[0] = fileMatch.getFile1().getNumberOfStatements()
  linesInFile[1] = fileMatch.getFile2().getNumberOfStatements()
  let similarityPercentage = computeSimilarityPercentage(
    linesInFile[0],
    linesInFile[1],
    commonLines[0].size,
    commonLines[1].size
  )
  fileMatch.setSimilarityPercentage(similarityPercentage)
}

/**
 * Generic function to compute similarity for given common number of lines and number of lines in each node/file.
 *
 * @param commonLines Number of common lines
 * @param linesInNode1 Number of lines in node 1
 * @param linesInNode2 Number of lines in node 2
 */
function computeSimilarityPercentageForCodeBlock(
  commonLines: number,
  linesInNode1: number,
  linesInNode2: number
): number {
  let minLines = Math.min(linesInNode1, linesInNode2)
  return Math.ceil((commonLines / minLines) * 100)
}

/**
 * Helper to detect plagiarism across two files or two nodes.
 *
 * @param fileMatch FileMatch to hold all the matches between file1(or node1 of file1) and file2(or node2 of file2)
 * @param node1 node representing file1
 * @param node2 node representing file2
 */
function checkMatch(fileMatch: FileMatch, node1: ISyntaxTreeNode, node2: ISyntaxTreeNode): [number, number] {
  if (node1.getHashCode() === node2.getHashCode()) {
    //if hashcodes match then the code can be mentioned as plagiarised
    //checking for number of lines in node 1 and node 2
    let linesInNode1: number = node1.getStartLineNumber() - node1.getEndLineNumber() + 1
    let linesInNode2: number = node2.getStartLineNumber() - node2.getEndLineNumber() + 1
    if (linesInNode1 == 1 && linesInNode2 == 1) {
      //a single line match
      //these are tracked by the parent i.e. caller which is the same function
      return [node1.getStartLineNumber(), node2.getStartLineNumber()]
    } else {
      // anything other than a line - example class or function is a complete match
      let similarltyPercentage = 100
      fileMatch.addCodeMatch(new CodeMatch(node1, node2, similarltyPercentage))
    }
  } else if (node1.getNodeType() === node2.getNodeType() && node1.getChildren() && node2.getChildren()) {
    //if node types are same and they have children
    //compare the children by recursively calling this function
    let matchedLines: Array<[number, number]> = []
    let innerNodes1 = node1.getChildren()
    let innerNodes2 = node2.getChildren()
    //any identified matches can be ignored from subsequent comparisions
    let seenNodesIn1: ISyntaxTreeNode[] = []
    let seenNodesIn2: ISyntaxTreeNode[] = []
    //comparing children of the current nodes
    for (let i = 0; i < innerNodes1.length; i++) {
      for (let j = 0; j < innerNodes2.length; j++) {
        let innerNode1 = innerNodes1[i]
        let innerNode2 = innerNodes2[j]
        if (seenNodesIn1.includes(innerNode1)) {
          //this node in file 1 has already been marked as plagiarized completely
          break
        }
        if (seenNodesIn2.includes(innerNode2)) {
          //this node in file 2 has already been marked as plagiarized completely
          continue
        }
        let innerMatchResults = checkMatch(fileMatch, innerNode1, innerNode2)
        if (innerMatchResults) {
          seenNodesIn1.push(innerNode1)
          seenNodesIn2.push(innerNode2)
          //all the lines or blocks inside of this node that matched
          matchedLines.push(innerMatchResults)
        }
      }
    }
    //if identified lines are above the decided threshold
    if (matchedLines.length > LINE_THRESHOLD_FOR_CODEMATCH) {
      //all lines in node 1. all other types are already added during recursive check
      let linesIn1 = innerNodes1.filter(
        (innerNode1) => innerNode1.getStartLineNumber() === innerNode1.getEndLineNumber()
      ).length
      //all lines in node 2
      let linesIn2 = innerNodes2.filter(
        (innerNode2) => innerNode2.getStartLineNumber() === innerNode2.getEndLineNumber()
      ).length
      let similarityPercentage = computeSimilarityPercentageForCodeBlock(matchedLines.length, linesIn1, linesIn2)
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
