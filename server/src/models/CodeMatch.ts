import ISyntaxTreeNode from "./ISyntaxTreeNode";

export default class CodeMatch {
    constructor(private node1: ISyntaxTreeNode, private node2: ISyntaxTreeNode, private similarityPercetage: number) {

    }

    getCodeMatchOfFile1(): [number, number] {
        return [this.node1.getStartLineNumber(), this.node1.getEndLineNumber()]
    }

    getCodeMatchOfFile2(): [number, number] {
        return [this.node2.getStartLineNumber(), this.node2.getEndLineNumber()]
    }

    getSimilarityPercentage(): number {
        return this.similarityPercetage
    }
}