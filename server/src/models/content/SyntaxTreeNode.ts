import ISyntaxTreeNode from './ISyntaxTreeNode'
import { Node, SyntaxKind, ThrowStatement } from 'ts-morph'
import { HashString } from '../schema/HashString'

class SyntaxTreeNode implements ISyntaxTreeNode {
  private startLineNumber: number
  private endLineNumber: number
  private nodeType: SyntaxKind
  private children: Array<ISyntaxTreeNode>
  private hashCode: HashString

  constructor(
    nodeType: SyntaxKind,
    startLine: number,
    endLine: number,
    hashCode: HashString,
    children: Array<ISyntaxTreeNode> = null
  ) {
    this.nodeType = nodeType
    this.startLineNumber = startLine
    this.endLineNumber = endLine
    this.hashCode = hashCode
    this.children = children
  }

  isIntermediate(): boolean {
    return this.children != null
  }

  modifyNodeType(nodeType: SyntaxKind) {
    this.nodeType = nodeType
  }

  getNodeType(): SyntaxKind {
    return this.nodeType
  }

  getStartLineNumber(): number {
    return this.startLineNumber
  }

  getEndLineNumber(): number {
    return this.endLineNumber
  }

  getHashCode(): HashString {
    return this.hashCode
  }

  getChildren(): Array<ISyntaxTreeNode> {
    return this.children
  }
}

export default SyntaxTreeNode
