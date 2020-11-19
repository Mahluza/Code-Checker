import { HashString } from "../schema/HashString"
import { Node, SyntaxKind } from 'ts-morph'
import HashFactory from "./hash_factory/HashFactory";
import IEncryptor from "./hash_factory/IEncryptor";

const DELIMITER: string = ' '

export default class HashBuilder {
    encryptor: IEncryptor;

    constructor(encryption?: string) {
        this.encryptor = new HashFactory(encryption).createEncryptor();
    }

    buildHashForVariableStatement(node: Node): HashString {
        if (node) {
            let hashCode: HashString = node.getKind().toString()
            node.forEachChild((child_node: Node) => {
                hashCode += DELIMITER +
                    child_node.getKind().toString()
            })
            console.log("hashCode for variable ", this.encryptor.generateHash(hashCode))
            return this.encryptor.generateHash(hashCode)
        }
    }

    buildHashForExpression(node: Node): HashString {
        let hashCode: HashString = node.getKind().toString()
        node.forEachDescendant((child_node: Node) => {
            if (child_node.getKind() != SyntaxKind.BinaryExpression) {
                hashCode +=
                    DELIMITER +
                    child_node.getKind().toString()
            }
        })
        console.log("hashCode for expression ", this.encryptor.generateHash(hashCode))
        return this.encryptor.generateHash(hashCode)
    }
}