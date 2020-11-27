import { Node, SyntaxKind } from 'ts-morph'

interface ISyntaxTreeNode {
  setStartLineNumber(startLine: Number): void
  getStartLineNumber(): number
  setEndLineNumber(endLine: Number): void
  getEndLineNumber(): number
  addChild(childNode: ISyntaxTreeNode): void
  addChildHashValue(childHash: SyntaxKind): void
  setHashValue(hash: Array<SyntaxKind>): void
  getHashValue(): Array<SyntaxKind>
  setHashCodeMap(hashCodeMap: Map<SyntaxKind, number>): void
  getHashCodeMap(): Map<SyntaxKind, number>
  getNodeType(): SyntaxKind
  setNodeType(nodeType: SyntaxKind): void
  getChildren(): Array<ISyntaxTreeNode>
}

export default ISyntaxTreeNode
