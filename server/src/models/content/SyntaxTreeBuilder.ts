import { Hash } from 'crypto'
import { Node, SyntaxKind, VariableDeclaration } from 'ts-morph'
import { HashString } from '../schema/HashString'
import HashBuilder from './HashBuilder'
import { DELIMITER } from './HashBuilder'
import ISyntaxTreeNode from './ISyntaxTreeNode'
import SyntaxTreeNode from './SyntaxTreeNode'

const INDICATOR = {
  ITERATION_STATEMENT: 'ITERATION_STATEMENT ',
}

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
          case SyntaxKind.ForStatement:
          case SyntaxKind.WhileStatement:
          case SyntaxKind.DoStatement:
            this.buildLoopStatements(child_node, syntaxTreeNodes)
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
    syntaxTreeNodes.push(this.buildSyntaxTreeNode(node, hashCode, childNodes))
  }

  buildFunctionDeclaration(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    let childNodes: ISyntaxTreeNode[] = []
    childNodes = this.buildAST(node.getFirstChildByKind(SyntaxKind.Block))
    hashCode = this.hashBuilder.buildHashForBlock(childNodes)
    syntaxTreeNodes.push(this.buildSyntaxTreeNode(node, hashCode, childNodes))
  }

  buildVariableStatements(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    //TODO: Remove if unused
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

  buildLoopStatements(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    let childNodes: ISyntaxTreeNode[] = []
    let expressionInFor: Node
    childNodes = this.buildAST(node.getFirstChildByKind(SyntaxKind.Block))
    //specific handling when for loop is used
    if (node.getKind() === SyntaxKind.ForStatement) {
      let variableDecls = node.getChildrenOfKind(SyntaxKind.VariableDeclarationList)
      //declarations in for loop might be attempted to declare outside when using while
      //appending variable statement to match with normal declaration and adding to block
      variableDecls.map((variableDecl) => {
        this.buildGenericStatements(
          variableDecl,
          syntaxTreeNodes,
          SyntaxKind.VariableStatement.toString(),
          DELIMITER.TOKEN
        )
      })
      //expression condition can be moved inside the block hence moving it and appending prefix
      expressionInFor = node.getChildAtIndex(6)
      this.buildGenericStatements(
        expressionInFor,
        childNodes,
        SyntaxKind.ExpressionStatement.toString(),
        DELIMITER.TOKEN
      )
    }
    //any iteration statement to represent in a standard iteration <condition> to detect similarities
    let prefix: HashString = INDICATOR.ITERATION_STATEMENT
    node.getChildrenOfKind(SyntaxKind.BinaryExpression).forEach((expr) => {
      prefix += this.hashBuilder.buildGenericHash(expr)
    })
    hashCode = this.hashBuilder.buildHashForBlock(childNodes, prefix)
    let iterationNode = this.buildSyntaxTreeNode(node, hashCode, childNodes)
    iterationNode.modifyNodeType(SyntaxKind.WhileStatement)
    syntaxTreeNodes.push(iterationNode)
  }

  buildGenericStatements(
    node: Node,
    syntaxTreeNodes: ISyntaxTreeNode[],
    prefix: HashString = '',
    prefix_delimiter = ''
  ) {
    let hashCode: HashString = ''
    hashCode = this.hashBuilder.buildGenericHash(node, prefix, prefix_delimiter)
    syntaxTreeNodes.push(this.buildSyntaxTreeNode(node, hashCode))
  }
}
