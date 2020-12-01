import { HashString } from '../schema/HashString'
import { Node, SyntaxKind } from 'ts-morph'
import HashFactory from '../hash_factory/HashFactory'
import IEncryptor from '../hash_factory/IEncryptor'
import ISyntaxTreeNode from './ISyntaxTreeNode'

export const DELIMITER = {
  TOKEN: '.', //Between tokens
  STATEMENT: '|', //Between statements
  PREFIX: '^', //Between prefix and codes
  CLASS: '#', //Between any thing inside a class
  FILE: '*', //Between any thing inside a file
  IF_EXPR: '()', //for expression in if
}

export default class HashBuilder {
  encryptor: IEncryptor

  constructor(encryption?: string) {
    this.encryptor = new HashFactory(encryption).createEncryptor()
  }

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

  buildGenericHash(node: Node, prefix: HashString = '', prefix_delimiter: HashString = ''): HashString {
    let hashCode: HashString = prefix + prefix_delimiter
    if (node) {
      hashCode += node.getKind().toString()
      node.forEachChild((child_node: Node) => {
        hashCode += DELIMITER.TOKEN + this.buildGenericHash(child_node)
      })
    }
    let h = this.encryptor.generateHash(hashCode)
    return this.encryptor.generateHash(hashCode)
  }

  buildHashForRoot(childNodes: ISyntaxTreeNode[]): HashString {
    return this.encryptor.generateHash(
      childNodes
        .map((cNode) => cNode.getHashCode())
        .sort()
        .join(DELIMITER.FILE)
    )
  }

  buildHashForClassDeclaration(childNodes: ISyntaxTreeNode[]): HashString {
    return this.encryptor.generateHash(
      childNodes
        .map((cNode) => cNode.getHashCode())
        .sort()
        .join(DELIMITER.CLASS)
    )
  }

  // buildHashForSwitchCondn(
  //   condn: Node,
  //   expressionForIf: Node,
  //   prefix: HashString,
  //   prefix_delimiter: HashString = ''
  // ): HashString {
  //   let hashCode: HashString = prefix + DELIMITER.IF_EXPR
  //   if (condn) {
  //     hashCode = hashCode + SyntaxKind.BinaryExpression.toString()
  //     hashCode = this.encryptor.generateHash(
  //       hashCode + DELIMITER.TOKEN + this.encryptor.generateHash(condn.getKind().toString())
  //     )
  //     hashCode = this.encryptor.generateHash(
  //       hashCode + DELIMITER.TOKEN + this.encryptor.generateHash(SyntaxKind.EqualsEqualsEqualsToken.toString())
  //     )
  //     hashCode = this.encryptor.generateHash(hashCode + DELIMITER.TOKEN + this.buildGenericHash(expressionForIf))
  //   }
  //   return this.encryptor.generateHash(hashCode)
  // }

  // buildHashForSwitchCondn(
  //   condn: Node,
  //   expressionForIf: Node,
  //   prefix: HashString,
  //   prefix_delimiter: HashString = ''
  // ): HashString {
  //   let hashCode: HashString = ''
  //   if (condn) {
  //     hashCode = this.encryptor.generateHash(DELIMITER.TOKEN + this.buildGenericHash(expressionForIf) + hashCode)
  //     hashCode = this.encryptor.generateHash(
  //       this.encryptor.generateHash(DELIMITER.TOKEN + SyntaxKind.EqualsEqualsEqualsToken.toString() + hashCode)
  //     )
  //     hashCode = this.encryptor.generateHash(
  //       this.encryptor.generateHash(DELIMITER.TOKEN + condn.getKind().toString()) + hashCode
  //     )
  //     hashCode = prefix + DELIMITER.IF_EXPR + SyntaxKind.BinaryExpression.toString() + hashCode
  //   }
  //   return this.encryptor.generateHash(hashCode)
  // }

  buildHashForSwitchCondn(
    condn: Node,
    expressionForIf: Node,
    prefix: HashString,
    prefix_delimiter: HashString = ''
  ): HashString {
    let hashCode: HashString = ''
    if (condn) {
      let childHashCode3 = this.buildGenericHash(expressionForIf)
      console.log(childHashCode3)
      let childHashCode2 = this.encryptor.generateHash(SyntaxKind.EqualsEqualsEqualsToken.toString())
      console.log(childHashCode2)
      let childHashCode1 = this.encryptor.generateHash(condn.getKind().toString())
      console.log(childHashCode1)
      hashCode =
        prefix +
        DELIMITER.IF_EXPR +
        SyntaxKind.BinaryExpression.toString() +
        DELIMITER.TOKEN +
        childHashCode1 +
        DELIMITER.TOKEN +
        childHashCode2 +
        DELIMITER.TOKEN +
        childHashCode3
    }
    console.log(this.encryptor.generateHash(hashCode))
    return this.encryptor.generateHash(hashCode)
  }
}
