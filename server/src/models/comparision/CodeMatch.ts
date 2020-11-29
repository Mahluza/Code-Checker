import ISyntaxTreeNode from '../content/ISyntaxTreeNode'
import { MatchType } from '../schema/MatchType'

export default class CodeMatch {
  constructor(
    private node1: ISyntaxTreeNode,
    private node2: ISyntaxTreeNode,
    private similarityPercetage: number,
    private matchedLines?: Array<[number, number]>
  ) {}

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

  getSimilarityPercentage(): number {
    return this.similarityPercetage
  }
}
