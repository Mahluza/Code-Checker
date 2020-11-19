import { Project, Node, SyntaxKind, VariableDeclaration, BinaryExpression, VariableStatement } from 'ts-morph'
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
    // const sourceFile2 = project.getSourceFileOrThrow('suspected.ts')

    let root1: ISyntaxTreeNode = undefined
    sourceFile.fixUnusedIdentifiers()
    root1 = this.createSyntaxTreeNode(
      sourceFile,
      '',
      this.traverseAST(sourceFile)
    )

    // this.printTreeNode(root1)
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
      let syntaxTreeNodes: ISyntaxTreeNode[] = []
      node.forEachChild((child_node: Node) => {
        switch (child_node.getKind()) {
          case SyntaxKind.FunctionDeclaration:
            let childNodes: ISyntaxTreeNode[] = []
            childNodes = this.traverseAST(
              child_node.getFirstChildByKind(SyntaxKind.Block)
            )
            syntaxTreeNodes.push(
              this.createSyntaxTreeNode(child_node, '', childNodes)
            )
            break
          case SyntaxKind.VariableStatement:
            this.traverseVariableStatements(child_node, syntaxTreeNodes)
            break
          case SyntaxKind.ExpressionStatement:
          case SyntaxKind.BinaryExpression:
            this.traverseExpressions(child_node, syntaxTreeNodes)
            break
          default:
            console.log(
              "default in AST ",
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

  traverseVariableStatements(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    let declNodes: VariableDeclaration[] = node.getDescendantsOfKind(
      SyntaxKind.VariableDeclaration
    )
    //For all declarations
    declNodes.forEach((declNode: VariableDeclaration) => {
      hashCode = this.generateHashForVariableStatement(declNode)
      syntaxTreeNodes.push(
        this.createSyntaxTreeNode(declNode, hashCode)
      )
      //For expression in declarations
      let binaryExprNode = declNode.getFirstChildByKind(SyntaxKind.BinaryExpression)
      if (binaryExprNode) {
        this.traverseExpressions(binaryExprNode, syntaxTreeNodes)
      }
    })
  }

  traverseExpressions(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    hashCode = this.generateHashForExpression(node)
    syntaxTreeNodes.push(
      this.createSyntaxTreeNode(node, hashCode)
    )
  }

  generateHashForVariableStatement(node: Node): HashString {
    if (node) {
      let hashCode: HashString = node.getKind().toString()
      node.forEachChild((child_node: Node) => {
        hashCode += DELIMITER +
          child_node.getKind().toString()
      })
      console.log("hashCode for variable ", hashCode)
      return hashCode
    }
  }

  generateHashForExpression(node: Node): HashString {
    let hashCode: HashString = node.getKind().toString()
    node.forEachDescendant((child_node: Node) => {
      if (child_node.getKind() != SyntaxKind.BinaryExpression) {
        hashCode +=
          DELIMITER +
          child_node.getKind().toString()
      }
    })
    console.log("hashCode for expression ", hashCode)
    return hashCode
  }
}
