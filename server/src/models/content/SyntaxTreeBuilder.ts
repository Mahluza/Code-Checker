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

  buildRootNode(node: Node): SyntaxTreeNode {
    let childNodes: ISyntaxTreeNode[] = this.buildAST(node)
    let hashCode: HashString = this.hashBuilder.buildHashForRoot(childNodes)
    return new SyntaxTreeNode(node.getKind(), node.getStartLineNumber(), node.getEndLineNumber(), hashCode, childNodes)
  }

  buildSyntaxTreeNode(node: Node, hashCode: HashString, childNodes: ISyntaxTreeNode[] = null): SyntaxTreeNode {
    return new SyntaxTreeNode(node.getKind(), node.getStartLineNumber(), node.getEndLineNumber(), hashCode, childNodes)
  }

  buildAST(node: Node): ISyntaxTreeNode[] {
    if (node) {
      let syntaxTreeNodes: ISyntaxTreeNode[] = []
      node.forEachChild((child_node: Node) => {
        switch (child_node.getKind()) {
          case SyntaxKind.ClassDeclaration:
          case SyntaxKind.InterfaceDeclaration:
          case SyntaxKind.TypeAliasDeclaration:
            this.buildClassDeclaration(child_node, syntaxTreeNodes)
            break
          case SyntaxKind.FunctionDeclaration:
          case SyntaxKind.MethodDeclaration:
          case SyntaxKind.Constructor:
            //get the block and run generic hash generation for each statement
            this.buildFunctionDeclaration(child_node, syntaxTreeNodes)
            break
          case SyntaxKind.Identifier:
          case SyntaxKind.EndOfFileToken:
            break
          default:
            this.buildGenericStatements(child_node, syntaxTreeNodes)
            // console.log(
            //   'default in AST ',
            //   child_node.getText(),
            //   '     ',
            //   child_node.getKindName(),
            //   '   ',
            //   child_node.getKind()
            // )
            break
        }
      })

      return syntaxTreeNodes
    }
  }

  buildClassDeclaration(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    let childNodes: ISyntaxTreeNode[] = []
    childNodes = this.buildAST(node)
    hashCode = this.hashBuilder.buildHashForClassDeclaration(childNodes)
    console.log('hashCode for class/interface', hashCode)
    syntaxTreeNodes.push(this.buildSyntaxTreeNode(node, hashCode, childNodes))
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
