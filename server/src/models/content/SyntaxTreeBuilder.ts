import { Node, SyntaxKind, VariableDeclaration } from 'ts-morph'
import { HashString } from '../schema/HashString'
import HashBuilder from './HashBuilder'
import { DELIMITER } from './HashBuilder'
import ISyntaxTreeNode from './ISyntaxTreeNode'
import SyntaxTreeNode from './SyntaxTreeNode'

const INDICATOR = {
  ITERATION_STATEMENT: 'ITERATION_STATEMENT ',
  CONDITIONAL_IF_STATEMENT: 'CONDITIONAL_STATEMENT ',
  CONDITIONAL_ELSE_STATEMENT: 'CONDITIONAL_ELSE_STATEMENT ',
}

export default class SyntaxTreeBuilder {
  private hashBuilder: HashBuilder
  constructor(encryption?: string) {
    this.hashBuilder = new HashBuilder(encryption)
  }

  /**
   * To build a Syntax tree as per configuration with information required for similarity detection
   *
   * @param node AST root of the file
   */
  buildRootNode(node: Node): SyntaxTreeNode {
    let childNodes: ISyntaxTreeNode[] = this.buildAST(node)
    let hashCode: HashString = this.hashBuilder.buildHashForRoot(childNodes)
    return new SyntaxTreeNode(
      node.getKind(),
      node.getStartLineNumber(),
      node.getEndLineNumber(),
      hashCode,
      childNodes,
      this.getCommentsInNode(node)
    )
  }

  private getCommentsInNode(file: Node): Array<number> {
    let nComments: Array<number> = []
    file.getDescendantsOfKind(SyntaxKind.JSDocComment).map((c) => {
      for (let i = c.getStartLineNumber(); i <= c.getEndLineNumber(); i++) {
        nComments.push(i)
      }
    })
    file.getDescendantsOfKind(SyntaxKind.MultiLineCommentTrivia).map((c) => {
      for (let i = c.getStartLineNumber(); i <= c.getEndLineNumber(); i++) {
        nComments.push(i)
      }
    })
    file.getDescendantsOfKind(SyntaxKind.SingleLineCommentTrivia).map((c) => {
      for (let i = c.getStartLineNumber(); i <= c.getEndLineNumber(); i++) {
        nComments.push(i)
      }
    })
    return nComments
  }

  private buildSyntaxTreeNode(node: Node, hashCode: HashString, childNodes: ISyntaxTreeNode[] = null): SyntaxTreeNode {
    return new SyntaxTreeNode(
      node.getKind(),
      node.getStartLineNumber(),
      node.getEndLineNumber(),
      hashCode,
      childNodes,
      this.getCommentsInNode(node)
    )
  }

  private buildAST(node: Node, ignoreBreak: boolean = false): ISyntaxTreeNode[] {
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
          case SyntaxKind.MultiLineCommentTrivia:
          case SyntaxKind.SingleLineCommentTrivia:
          case SyntaxKind.JSDocComment:
          case SyntaxKind.EndOfFileToken:
            break
          case SyntaxKind.ForStatement:
          case SyntaxKind.WhileStatement:
          case SyntaxKind.DoStatement:
            this.buildLoopStatements(child_node, syntaxTreeNodes)
            break
          case SyntaxKind.IfStatement:
            this.buildIfStatement(child_node, syntaxTreeNodes)
            break
          case SyntaxKind.SwitchStatement:
            this.buildSwitchStatement(child_node, syntaxTreeNodes)
            break
          default:
            if (ignoreBreak && child_node.getKind() === SyntaxKind.BreakStatement) {
              break
            }
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

  private buildClassDeclaration(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    let childNodes: ISyntaxTreeNode[] = []
    childNodes = this.buildAST(node)
    hashCode = this.hashBuilder.buildHashForClassDeclaration(childNodes)
    syntaxTreeNodes.push(this.buildSyntaxTreeNode(node, hashCode, childNodes))
  }

  private buildFunctionDeclaration(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    let childNodes: ISyntaxTreeNode[] = []
    childNodes = this.buildAST(node.getFirstChildByKind(SyntaxKind.Block))
    hashCode = this.hashBuilder.buildHashForBlock(childNodes)
    syntaxTreeNodes.push(this.buildSyntaxTreeNode(node, hashCode, childNodes))
  }

  private buildSwitchStatement(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let identifierOfSwitch = node.getFirstChildByKind(SyntaxKind.Identifier)
    let caseBlock = node.getFirstChildByKind(SyntaxKind.CaseBlock)
    if (caseBlock) {
      caseBlock.getChildrenOfKind(SyntaxKind.CaseClause).map((case_node) => {
        let prefix: HashString = INDICATOR.CONDITIONAL_IF_STATEMENT
        let expressionForIf = case_node.getChildAtIndex(1)
        prefix = this.hashBuilder.buildHashForSwitchCondn(identifierOfSwitch, expressionForIf, prefix)
        console.log('prefix in switch.... ', prefix)
        let blockNode = case_node.getFirstChildByKind(SyntaxKind.Block)
        if (blockNode) {
          let childNodes = this.buildAST(blockNode, true)
          let hashCode = this.hashBuilder.buildHashForBlock(childNodes, prefix)
          let syntaxTreeNode = this.buildSyntaxTreeNode(node, hashCode, childNodes)
          syntaxTreeNodes.push(syntaxTreeNode)
          syntaxTreeNode.modifyNodeType(SyntaxKind.IfStatement)
        }
      })
      let defaultBlock = caseBlock.getFirstChildByKind(SyntaxKind.DefaultClause)
      if (defaultBlock) {
        let prefix: HashString = INDICATOR.CONDITIONAL_ELSE_STATEMENT
        let blockNode = defaultBlock.getFirstChildByKind(SyntaxKind.Block)
        let childNodes = this.buildAST(blockNode, true)
        let hashCode = this.hashBuilder.buildHashForBlock(childNodes, prefix)
        let syntaxTreeNode = this.buildSyntaxTreeNode(node, hashCode, childNodes)
        syntaxTreeNodes.push(syntaxTreeNode)
        syntaxTreeNode.modifyNodeType(blockNode.getKind())
      }
    }
  }

  private buildIfStatement(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
    let hashCode: HashString = ''
    let childNodes: ISyntaxTreeNode[] = []
    let prefix: HashString = INDICATOR.CONDITIONAL_IF_STATEMENT
    let expressionForIf = node.getChildAtIndex(2)
    prefix = this.hashBuilder.buildGenericHash(expressionForIf, prefix, DELIMITER.IF_EXPR)
    console.log('prefix in if.... ', prefix)
    let blocks = node.getChildrenOfKind(SyntaxKind.Block)
    if (blocks && blocks.length) {
      childNodes.push(...this.buildAST(blocks[0]))
    }
    hashCode = this.hashBuilder.buildHashForBlock(childNodes, prefix)
    syntaxTreeNodes.push(this.buildSyntaxTreeNode(node, hashCode, childNodes))
    //If there is a if - else if ....for the else if part
    let elseIfNode = node.getFirstChildByKind(SyntaxKind.IfStatement)
    if (elseIfNode) {
      //calling the same recursively to store all if else if's data at one level
      //to identify some plagiarisms
      this.buildIfStatement(elseIfNode, syntaxTreeNodes)
    }
    //If there is a if - else .....for the else part
    if (blocks.length > 1) {
      let hashCodeElse: HashString = ''
      let childNodesElse: ISyntaxTreeNode[] = []
      let prefixElse: HashString = INDICATOR.CONDITIONAL_ELSE_STATEMENT
      childNodesElse.push(...this.buildAST(blocks[1]))
      hashCodeElse = this.hashBuilder.buildHashForBlock(childNodesElse, prefixElse)
      syntaxTreeNodes.push(this.buildSyntaxTreeNode(blocks[1], hashCodeElse, childNodesElse))
    }
  }

  private buildLoopStatements(node: Node, syntaxTreeNodes: ISyntaxTreeNode[]) {
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

  private buildGenericStatements(
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
