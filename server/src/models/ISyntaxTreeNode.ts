import { Node, SyntaxKind } from 'ts-morph'
import { HashString } from '../schema/HashString'

interface ISyntaxTreeNode {
  getNodeType(): SyntaxKind
  getStartLineNumber(): number
  getEndLineNumber(): number
  getHashCode(): HashString
  getChildren(): Array<ISyntaxTreeNode>
}

export default ISyntaxTreeNode
