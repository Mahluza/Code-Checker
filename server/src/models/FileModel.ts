import { Project, Node, SyntaxKind } from 'ts-morph'
import ISyntaxTreeNode from './ISyntaxTreeNode'
import SyntaxTreeNode from './SyntaxTreeNode'
import ComparisonModel from './ComparisonModel'

var crypto = require('crypto');

export default class FileModel {

  constructor(private name: string, private content: string) {
    //TODO: file meta data
  }

  getName(): string {
    return name
  }

  getContent(): string {
    return name
  }

  run() {
    const project = new Project()
    project.addSourceFileAtPath('./src/models/exp1.ts')
    project.addSourceFileAtPath('./src/models/suspected.ts')
    const sourceFile = project.getSourceFileOrThrow('exp1.ts')
    const sourceFile2 = project.getSourceFileOrThrow('suspected.ts')

    let root1: ISyntaxTreeNode = undefined
    sourceFile.fixUnusedIdentifiers()
    root1 = this.constructTreeNode(root1, sourceFile)
    let hashcode = this.traverseAST(sourceFile, root1)
    root1.setHashValue(hashcode)
    this.updateHashCodeMapOfANode(root1, hashcode)

    let root2: ISyntaxTreeNode = undefined
    sourceFile2.fixUnusedIdentifiers()
    root2 = this.constructTreeNode(root2, sourceFile2)
    let hashcode2 = this.traverseAST(sourceFile2, root2)
    root2.setHashValue(hashcode2)
    this.updateHashCodeMapOfANode(root2, hashcode2)

    let comparisonObject = new ComparisonModel()
    comparisonObject.compareFiles(root1, root2)
  }

  constructTreeNode(treeNode: ISyntaxTreeNode, astNode: Node) {
    treeNode = new SyntaxTreeNode()
    treeNode.setNodeType(astNode.getKind())
    treeNode.setStartLineNumber(astNode.getStartLineNumber())
    treeNode.setEndLineNumber(astNode.getEndLineNumber())
    return treeNode
  }

  updateHashCodeMapOfANode(
    treeNode: ISyntaxTreeNode,
    hashCodeArray: Array<SyntaxKind>
  ) {
    if (treeNode) {
      for (let key of hashCodeArray) {
        if (treeNode.getHashCodeMap().has(key)) {
          let occurences = treeNode.getHashCodeMap().get(key)
          treeNode.getHashCodeMap().set(key, occurences + 1)
        } else {
          treeNode.getHashCodeMap().set(key, 1)
        }
      }
    }
  }
  traverseAST(node: Node, treeNode: ISyntaxTreeNode): SyntaxKind[] {
    if (node) {
      let hashcode: SyntaxKind[] = []
      let childTreeNode: ISyntaxTreeNode = undefined

      node.forEachChild((child_node: Node) => {
        switch (child_node.getKind()) {
          case SyntaxKind.Identifier:
            childTreeNode = this.constructTreeNode(childTreeNode, child_node)
            hashcode.push(SyntaxKind.Identifier)
            treeNode.addChild(childTreeNode)
            treeNode.setHashValue(hashcode)
            this.updateHashCodeMapOfANode(treeNode, [SyntaxKind.Identifier])
            break
          case SyntaxKind.StringLiteral:
          case SyntaxKind.NumericLiteral:
            childTreeNode = this.constructTreeNode(childTreeNode, child_node)
            hashcode.push(child_node.getKind())
            treeNode.addChild(childTreeNode)
            treeNode.setHashValue(hashcode)
            this.updateHashCodeMapOfANode(treeNode, [child_node.getKind()])
            break
          case SyntaxKind.FunctionDeclaration:
            childTreeNode = this.constructTreeNode(childTreeNode, child_node)
            hashcode.push(
              ...this.traverseAST(
                child_node.getFirstChildByKind(SyntaxKind.Block),
                childTreeNode
              )
            )
            treeNode.addChild(childTreeNode)
            treeNode.setHashValue(hashcode)
            break
          case SyntaxKind.VariableDeclarationList:
          case SyntaxKind.VariableStatement:
            hashcode.push(...this.traverseAST(child_node, treeNode))
            treeNode.setHashValue(hashcode)
            break
          case SyntaxKind.VariableDeclaration:
            childTreeNode = this.constructTreeNode(childTreeNode, child_node)
            hashcode.push(...this.traverseAST(child_node, childTreeNode))
            treeNode.setHashValue(hashcode)
            treeNode.addChild(childTreeNode)
            this.updateHashCodeMapOfANode(treeNode, hashcode)
            break

          case SyntaxKind.ExpressionStatement:
          case SyntaxKind.BinaryExpression:
            childTreeNode = this.constructTreeNode(childTreeNode, child_node)
            this.traverseExpression(child_node, childTreeNode)
            hashcode.push(...this.traverseExpression(child_node, childTreeNode))
            treeNode.setHashValue(hashcode)
            treeNode.addChild(childTreeNode)
            this.updateHashCodeMapOfANode(childTreeNode, hashcode)
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

      return hashcode
    }
  }

  traverseExpression(node: Node, treeNode: ISyntaxTreeNode): SyntaxKind[] {
    let hashcode: SyntaxKind[] = []
    let childTreeNode: ISyntaxTreeNode = undefined
    node.forEachChild((child_node) => {
      switch (child_node.getKind()) {
        case SyntaxKind.BinaryExpression:
          childTreeNode = this.constructTreeNode(childTreeNode, child_node)
          hashcode.push(...this.traverseExpression(child_node, childTreeNode))
          treeNode.addChild(childTreeNode)
          treeNode.setHashValue(hashcode)
          this.updateHashCodeMapOfANode(childTreeNode, hashcode)
          break
        case SyntaxKind.Identifier:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
        case SyntaxKind.AsteriskToken:
        case SyntaxKind.AsteriskAsteriskToken:
        case SyntaxKind.SlashToken:
        case SyntaxKind.PercentToken:
          childTreeNode = this.constructTreeNode(childTreeNode, child_node)
          hashcode.push(child_node.getKind())
          treeNode.addChild(childTreeNode)
          treeNode.setHashValue(hashcode)
          this.updateHashCodeMapOfANode(childTreeNode, [child_node.getKind()])
          break
        case SyntaxKind.EqualsToken:
          // To handle cases were code can be declared and initialized seperately
          hashcode.pop()
          break
        default:
          break
      }
    })
    return hashcode
  }
}
