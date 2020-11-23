import { HashString } from '../schema/HashString'
import { Node, SyntaxKind } from 'ts-morph'
import HashFactory from '../hash_factory/HashFactory'
import IEncryptor from '../hash_factory/IEncryptor'
import ISyntaxTreeNode from './ISyntaxTreeNode'

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

  buildGenericHash(node: Node): HashString {
    let hashCode: HashString = ''
    if (node) {
      hashCode = node.getKind().toString()
      node.forEachChild((child_node: Node) => {
        hashCode += DELIMITER.TOKEN + this.buildGenericHash(child_node)
      })
    }
    return this.encryptor.generateHash(hashCode)
  }
}
