import { Project, Node, SyntaxKind } from 'ts-morph'
import ISyntaxTreeNode from './ISyntaxTreeNode'
import SyntaxTreeNode from './SyntaxTreeNode'
import ComparisonModel from './ComparisonModel'
import { HashString } from '../schema/HashString'

var crypto = require('crypto')
const DELIMITER: string = ' '

export default class FileModel {
  constructor(private name: string, private content: string) {
    //TODO: file meta data
  }

  getName(): string {
    return this.name
  }

  getContent(): string {
    return this.content
  }

  run() {
    const project = new Project()
    project.addSourceFileAtPath('./src/models/exp1.ts')
    project.addSourceFileAtPath('./src/models/suspected.ts')
    const sourceFile = project.getSourceFileOrThrow('exp1.ts')
    const sourceFile2 = project.getSourceFileOrThrow('suspected.ts')

    let root1: ISyntaxTreeNode = undefined
    sourceFile.fixUnusedIdentifiers()
    root1 = this.createSyntaxTreeNode(
      sourceFile,
      '',
      this.traverseAST(sourceFile)
    )

    this.printTreeNode(root1)
  }

  printTreeNode(treeNode: ISyntaxTreeNode) {
    let children = treeNode.getChildren()
    console.log('node Type->', treeNode.getNodeType())
    if (children != null)
      for (let i = 0; i < children.length; i++) {
        console.log(
          'Tree: nodetype->',
          children[i].getNodeType(),
          'hash->',
          children[i].getHashCode()
        )
        this.printTreeNode(children[i])
      }
  }

  traverseAST(node: Node): ISyntaxTreeNode[] {
    if (node) {
      let childNodes: ISyntaxTreeNode[] = []
      let syntaxTreeNodes: ISyntaxTreeNode[] = []
      let hashCode: HashString = ''
      node.forEachChild((child_node: Node) => {
        switch (child_node.getKind()) {
          case SyntaxKind.FunctionDeclaration:
            childNodes = this.traverseAST(
              child_node.getFirstChildByKind(SyntaxKind.Block)
            )
            syntaxTreeNodes.push(
              this.createSyntaxTreeNode(child_node, '', childNodes)
            )
            break

          case SyntaxKind.VariableStatement:
            let declNode = child_node.getFirstDescendantByKind(
              SyntaxKind.VariableDeclaration
            )
            childNodes = this.traverseAST(declNode)
            hashCode += this.getHashForVariableStatement(declNode)
            syntaxTreeNodes.push(
              this.createSyntaxTreeNode(declNode, hashCode, childNodes)
            )
            break
          case SyntaxKind.ExpressionStatement:
          case SyntaxKind.BinaryExpression:
            hashCode = this.traverseExpression(child_node)
            syntaxTreeNodes.push(
              this.createSyntaxTreeNode(child_node, hashCode)
            )
            break
          default:
            console.log(
              child_node.getText(),
              '     ',
              child_node.getKindName(),
              '   ',
              child_node.getKind()
            )
            break
        }
      })

      return syntaxTreeNodes
    }
  }

  traverseExpression(node: Node): HashString {
    let hashCode: HashString = ''
    node.forEachDescendant((child_node: Node) => {
      if (child_node.getKind() != SyntaxKind.BinaryExpression) {
        console.log(child_node.getText(), child_node.getKind())
        hashCode +=
          node.getKind() +
          DELIMITER +
          child_node.getKind().toString() +
          DELIMITER
      }
    })
    return hashCode
  }

  createSyntaxTreeNode(
    node: Node,
    hashCode: HashString,
    childNodes: ISyntaxTreeNode[] = null
  ): SyntaxTreeNode {
    return new SyntaxTreeNode(
      node.getKind(),
      node.getStartLineNumber(),
      node.getEndLineNumber(),
      hashCode,
      childNodes
    )
  }

  getHashForVariableStatement(node: Node): HashString {
    if (node) {
      let hashCode: HashString = ''
      node.forEachChild((child_node: Node) => {
        switch (child_node.getKind()) {
          case SyntaxKind.NumericLiteral:
            hashCode +=
              node.getKind() +
              DELIMITER +
              child_node.getKind().toString() +
              DELIMITER
            break
          default:
            console.log(child_node.getKind())
        }
      })
      return hashCode
    }
  }

  getHashForExpression(node: Node): HashString {
    if (node) {
      let hashCode: HashString = ''
      node.forEachChild((child_node: Node) => {
        switch (child_node.getKind()) {
          case SyntaxKind.NumericLiteral:
          case SyntaxKind.PlusToken:
          case SyntaxKind.MinusToken:
          case SyntaxKind.AsteriskToken:
          case SyntaxKind.AsteriskAsteriskToken:
          case SyntaxKind.SlashToken:
          case SyntaxKind.PercentToken:
            hashCode +=
              node.getKind() +
              DELIMITER +
              child_node.getKind().toString() +
              DELIMITER
            break
          default:
            console.log(child_node.getKind())
        }
      })
      return hashCode
    }
  }

  traverseExpression1(node: Node): ISyntaxTreeNode[] {
    let childNodes: ISyntaxTreeNode[] = []
    let syntaxTreeNodes: ISyntaxTreeNode[] = []
    let hashCode: HashString = ''
    node.forEachChild((child_node) => {
      switch (child_node.getKind()) {
        case SyntaxKind.BinaryExpression:
          // childNodes = this.traverseExpression(child_node)
          hashCode = this.getHashForExpression(child_node)
          syntaxTreeNodes.push(
            this.createSyntaxTreeNode(child_node, hashCode, childNodes)
          )
          break
        case SyntaxKind.EqualsToken:
          // To handle cases were code can be declared and initialized seperately
          // hashcode.pop()
          break
        default:
          break
      }
    })
    return syntaxTreeNodes
  }
}
