import { HashString } from '../schema/HashString'
import { Node, SyntaxKind } from 'ts-morph'
import HashFactory from '../hash_factory/HashFactory'
import IEncryptor from '../hash_factory/IEncryptor'
import ISyntaxTreeNode from './ISyntaxTreeNode'

/**
 * DELIMITER to seperate out tokens, statements and different portions of the code
 */
//useful for debugging purpose
export const DELIMITER = {
  TOKEN: '.', //Between tokens
  STATEMENT: '|', //Between statements
  PREFIX: '^', //Between prefix and codes
  CLASS: '#', //Between any thing inside a class
  FILE: '*', //Between any thing inside a file
  IF_EXPR: '()', //for expression in if
}

/**
 * Builder for generating hashcodes for different types of code.
 */
export default class HashBuilder {
  encryptor: IEncryptor

  constructor(encryption?: string) {
    this.encryptor = new HashFactory(encryption).createEncryptor()
  }

  /**
   * Generate hashcode for nodes of block type
   */
  buildHashForBlock(childNodes: ISyntaxTreeNode[], prefix: HashString = ''): HashString {
    return this.encryptor.generateHash(
      prefix +
        DELIMITER.PREFIX +
        childNodes
          .map((cNode) => cNode.getHashCode())
          .sort()
          .join(DELIMITER.STATEMENT)
    )
  }

  /**
   * Generic hashcode generation for any node or statement
   */
  buildGenericHash(node: Node, prefix: HashString = '', prefix_delimiter: HashString = ''): HashString {
    let hashCode: HashString = ''
    if (node) {
      hashCode += node.getKind().toString()
      node.forEachChild((child_node: Node) => {
        hashCode += DELIMITER.TOKEN + this.buildGenericHash(child_node)
      })
      if (prefix != '') {
        hashCode = prefix + prefix_delimiter + this.encryptor.generateHash(hashCode)
      }
    }
    return this.encryptor.generateHash(hashCode)
  }

  /**
   * Generate hashcode for root for the Syntax tree
   */
  buildHashForRoot(childNodes: ISyntaxTreeNode[]): HashString {
    return this.encryptor.generateHash(
      childNodes
        .map((cNode) => cNode.getHashCode())
        .sort()
        .join(DELIMITER.FILE)
    )
  }

  /**
   * Generate hashcode for nodes of type class
   */
  buildHashForClassDeclaration(childNodes: ISyntaxTreeNode[]): HashString {
    return this.encryptor.generateHash(
      childNodes
        .map((cNode) => cNode.getHashCode())
        .sort()
        .join(DELIMITER.CLASS)
    )
  }

  /**
   * Generate hashcode for nodes of type switch. This would generate switch hashcode to be
   * represented in same way as if else if statement
   */
  buildHashForSwitchCondn(
    condn: Node,
    expressionForIf: Node,
    prefix: HashString,
    prefix_delimiter: HashString = ''
  ): HashString {
    let hashCode: HashString = ''
    if (condn) {
      // explicit expression generation similar to if statement
      let childHashCode3 = this.buildGenericHash(expressionForIf)
      let childHashCode2 = this.encryptor.generateHash(SyntaxKind.EqualsEqualsEqualsToken.toString())
      let childHashCode1 = this.encryptor.generateHash(condn.getKind().toString())
      hashCode =
        prefix +
        DELIMITER.IF_EXPR +
        this.encryptor.generateHash(
          SyntaxKind.BinaryExpression.toString() +
            DELIMITER.TOKEN +
            childHashCode1 +
            DELIMITER.TOKEN +
            childHashCode2 +
            DELIMITER.TOKEN +
            childHashCode3
        )
    }
    return this.encryptor.generateHash(hashCode)
  }
}
