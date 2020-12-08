import ISyntaxTreeNode from './ISyntaxTreeNode'
import { SyntaxKind } from 'ts-morph'
import { HashString } from '../schema/HashString'

/**
 * Represents node of the custom syntax tree.
 * We use this class to create our custom tree with relevant information at each level.
 *
 * We have the line details(start, end), number of comments in this node,
 * type of the node, children of this node(if any) and hashCode of the node
 */
class SyntaxTreeNode implements ISyntaxTreeNode {
  private startLineNumber: number
  private endLineNumber: number
  private commentLines: Array<number>
  private nodeType: SyntaxKind
  private children: Array<ISyntaxTreeNode>
  private hashCode: HashString

  constructor(
    nodeType: SyntaxKind,
    startLine: number,
    endLine: number,
    hashCode: HashString,
    children: Array<ISyntaxTreeNode>,
    commentLines: Array<number> = []
  ) {
    this.nodeType = nodeType
    this.startLineNumber = startLine
    this.endLineNumber = endLine
    this.hashCode = hashCode
    this.children = children
    this.commentLines = commentLines
  }

  /**
   * Modifies a node type to bring a common format among certain nodes.
   */
  modifyNodeType(nodeType: SyntaxKind) {
    this.nodeType = nodeType
  }

  /**
   * Returns the type of the node
   */
  getNodeType(): SyntaxKind {
    return this.nodeType
  }

  /**
   * Returns the start line number of the node
   */
  getStartLineNumber(): number {
    return this.startLineNumber
  }

  /**
   * Returns the end line number of the node
   */
  getEndLineNumber(): number {
    return this.endLineNumber
  }

  /**
   * Returns the hash code generated for the node
   */
  getHashCode(): HashString {
    return this.hashCode
  }

  /**
   * Returns the child nodes of the node
   */
  getChildren(): Array<ISyntaxTreeNode> {
    return this.children
  }

  /**
   * Returns the line numbers of all the comment in the node
   */
  getCommentLinesInNode(): Array<number> {
    return this.commentLines
  }
}

export default SyntaxTreeNode
