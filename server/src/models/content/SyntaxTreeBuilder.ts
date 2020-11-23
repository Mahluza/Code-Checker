import { Node, SyntaxKind, VariableDeclaration } from 'ts-morph'
import { HashString } from '../schema/HashString'
import HashBuilder from './HashBuilder'
import ISyntaxTreeNode from './ISyntaxTreeNode'
import SyntaxTreeNode from './SyntaxTreeNode'

export default class SyntaxTreeBuilder {
  private hashBuilder: HashBuilder
  constructor(encryption?: string) {
    this.hashBuilder = new HashBuilder(encryption)
  }

  buildSyntaxTreeNode(node: Node, hashCode: HashString, childNodes: ISyntaxTreeNode[] = null): SyntaxTreeNode {
    return new SyntaxTreeNode(node.getKind(), node.getStartLineNumber(), node.getEndLineNumber(), hashCode, childNodes)
  }

  buildAST(node: Node): ISyntaxTreeNode[] {
    if (node) {
      let syntaxTreeNodes: ISyntaxTreeNode[] = []
      node.forEachChild((child_node: Node) => {
        switch (child_node.getKind()) {
          case SyntaxKind.FunctionDeclaration:
            this.buildFunctionDeclaration(child_node, syntaxTreeNodes)
            break
          case SyntaxKind.VariableStatement:
            this.buildGenericStatements(child_node, syntaxTreeNodes)
            break
          case SyntaxKind.EndOfFileToken:
            break
          default:
            this.buildGenericStatements(child_node, syntaxTreeNodes)
            console.log(
              'default in AST ',
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

  buildFunctionDeclaration(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    let childNodes: ISyntaxTreeNode[] = []
    childNodes = this.buildAST(node.getFirstChildByKind(SyntaxKind.Block))
    hashCode = this.hashBuilder.buildHashForFunctionDeclaration(childNodes)
    console.log('hashCode for function', hashCode)
    syntaxTreeNodes.push(this.buildSyntaxTreeNode(node, hashCode, childNodes))
  }

  buildVariableStatements(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    let declNodes: VariableDeclaration[] = node.getDescendantsOfKind(SyntaxKind.VariableDeclaration)
    //For all declarations
    declNodes.forEach((declNode: VariableDeclaration) => {
      hashCode = this.hashBuilder.buildGenericHash(declNode)
      syntaxTreeNodes.push(this.buildSyntaxTreeNode(declNode, hashCode))
      //For expression in declarations
      let binaryExprNode = declNode.getFirstChildByKind(SyntaxKind.BinaryExpression)
      if (binaryExprNode) {
        this.buildGenericStatements(binaryExprNode, syntaxTreeNodes)
      }
    })
  }

  buildGenericStatements(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    hashCode = this.hashBuilder.buildGenericHash(node)
    syntaxTreeNodes.push(this.buildSyntaxTreeNode(node, hashCode))
  }
}
