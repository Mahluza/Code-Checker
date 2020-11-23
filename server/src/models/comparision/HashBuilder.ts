import { HashString } from '../schema/HashString'
import { Node, SyntaxKind } from 'ts-morph'
import HashFactory from '../hash_factory/HashFactory'
import IEncryptor from '../hash_factory/IEncryptor'
import ISyntaxTreeNode from '../content/ISyntaxTreeNode'

const DELIMITER = {
  TOKEN: '.',
  STATEMENT: '|',
}

export default class HashBuilder {
  encryptor: IEncryptor

  constructor(encryption?: string) {
    this.encryptor = new HashFactory(encryption).createEncryptor()
  }

  buildHashForFunctionDeclaration(childNodes: ISyntaxTreeNode[]): HashString {
    return this.encryptor.generateHash(
      childNodes
        .map((cNode) => cNode.getHashCode())
        .sort()
        .join(DELIMITER.STATEMENT)
    )
  }

  buildHashForVariableStatement(node: Node): HashString {
    if (node) {
      let hashCode: HashString = node.getKind().toString()
      node.forEachChild((child_node: Node) => {
        hashCode += DELIMITER.TOKEN + child_node.getKind().toString()
      })
      console.log('hashCode for variable ', this.encryptor.generateHash(hashCode))
      return this.encryptor.generateHash(hashCode)
    }
  }

  buildHashForExpression(node: Node): HashString {
    let hashCode: HashString = node.getKind().toString()
    node.forEachDescendant((child_node: Node) => {
      if (child_node.getKind() != SyntaxKind.BinaryExpression) {
        hashCode += DELIMITER.TOKEN + child_node.getKind().toString()
      }
    })
    console.log('hashCode for expression ', this.encryptor.generateHash(hashCode))
    return this.encryptor.generateHash(hashCode)
  }
}
