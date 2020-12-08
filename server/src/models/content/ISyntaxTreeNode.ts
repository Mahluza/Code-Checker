import { Node, SyntaxKind } from 'ts-morph'
import { HashString } from '../schema/HashString'

interface ISyntaxTreeNode {
  /**
   * Returns the type of the node
   */
  getNodeType(): SyntaxKind

  /**
   * Returns the start line number of the node
   */
  getStartLineNumber(): number

  /**
   * Returns the end line number of the node
   */
  getEndLineNumber(): number

  /**
   * Returns the hash code generated for the node
   */
  getHashCode(): HashString

  /**
   * Returns the child nodes of the node
   */
  getChildren(): Array<ISyntaxTreeNode>

  /**
   * Returns the line numbers of all the comment in the node
   */
  getCommentLinesInNode(): Array<number>
}

export default ISyntaxTreeNode
