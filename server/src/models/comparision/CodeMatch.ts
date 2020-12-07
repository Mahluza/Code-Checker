import ISyntaxTreeNode from '../content/ISyntaxTreeNode'
import { MatchType } from '../schema/MatchType'

/**
 * Represents the matched code portion in two files i.e. between two nodes belonging to two files of user
 */
export default class CodeMatch {
  constructor(
    private node1: ISyntaxTreeNode,
    private node2: ISyntaxTreeNode,
    private similarityPercetage: number,
    private matchedLines?: Array<[number, number]>
  ) {}

  /**
   * Returns the code match information on type of match and the lines or range that matched in both files.
   */
  getCodeMatch() {
    if (this.matchedLines) {
      return {
        type: MatchType.CommonLines,
        lines: this.matchedLines,
      }
    } else {
      return {
        node1: this.node1,
        node2: this.node2,
        type: MatchType.CompleteMatch,
        rangeOfNode1: [this.node1.getStartLineNumber(), this.node1.getEndLineNumber()],
        rangeOfNode2: [this.node2.getStartLineNumber(), this.node2.getEndLineNumber()],
      }
    }
  }

  /**
   * Returns the similarity percentage of the code match
   */
  getSimilarityPercentage(): number {
    return this.similarityPercetage
  }
}
