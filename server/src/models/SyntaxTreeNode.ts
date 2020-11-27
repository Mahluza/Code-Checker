import ISyntaxTreeNode from './ISyntaxTreeNode'
import { Node, SyntaxKind, ThrowStatement } from 'ts-morph'

class SyntaxTreeNode implements ISyntaxTreeNode {
  private nodeType: SyntaxKind
  private children: Array<ISyntaxTreeNode>
  private hash: Array<SyntaxKind>
  private hashCodeMap: Map<SyntaxKind, number>
  private startLineNumber: number
  private endLineNumber: number

  constructor() {
    this.children = new Array<ISyntaxTreeNode>()
    this.hash = new Array<SyntaxKind>()
    this.hashCodeMap = new Map()
  }

  setNodeType(nodeType: SyntaxKind) {
    this.nodeType = nodeType
  }

  getNodeType(): SyntaxKind {
    return this.nodeType
  }

  setStartLineNumber(startLine: number) {
    this.startLineNumber = startLine
  }

  getStartLineNumber(): number {
    return this.startLineNumber
  }

  setEndLineNumber(endLine: number) {
    this.endLineNumber = endLine
  }

  getEndLineNumber(): number {
    return this.endLineNumber
  }

  addChild(childNode: ISyntaxTreeNode): void {
    this.children.push(childNode)
  }

  addChildHashValue(childHash: SyntaxKind) {
    this.hash.push(childHash)
  }

  setHashValue(hash: Array<SyntaxKind>) {
    this.hash = hash
  }
  getHashValue(): Array<SyntaxKind> {
    return this.hash
  }

  setHashCodeMap(hashCodeMap: Map<SyntaxKind, number>) {
    this.hashCodeMap = hashCodeMap
  }

  getHashCodeMap(): Map<SyntaxKind, number> {
    return this.hashCodeMap
  }

  getChildren(): Array<ISyntaxTreeNode> {
    return this.children
  }
}

export default SyntaxTreeNode
