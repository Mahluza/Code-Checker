import FileModel from './fileModel'
import {
  Project,
  Node,
  SourceFile,
  SyntaxKind,
  Identifier,
  VariableDeclaration,
  BinaryExpression,
  ExpressionStatement,
} from 'ts-morph'

export default class DetectionModel {
  astNodeHashMap: Map<number, number>
  astNodeSuspectedHashMap: Map<number, number>
  constructor(private File1: FileModel, private File2: FileModel) {
    this.astNodeHashMap = new Map()
    this.astNodeSuspectedHashMap = new Map()
  }

  run() {
    const project = new Project()
    project.addSourceFileAtPath('./src/models/exp1.ts')
    const sourceFile = project.getSourceFileOrThrow('exp1.ts')
    console.log('calling traverse-----------')
    let hashcode = this.traverseAST(sourceFile)
    console.log('completed traverse-----------', hashcode)
  }

  printAST(src: Node, acc: number) {
    src.forEachChild((node_el: Node) => {
      console.log(
        '>>',
        acc,
        '--',
        node_el.getStartLineNumber(),
        '-->',
        node_el.getKindName(),
        '-->>',
        node_el.getText(),
        '-->',
        node_el.getKind()
      )
      this.printAST(node_el, acc)
      //    node_el.forEachDescendant((descendant : Node) =>{
      //     console.log("--",descendant.getStartLineNumber(),"-->",descendant.getKindName(), "-->>", descendant.getText(),"-->", descendant.getKind());
      //     })
    })
    // }
  }

  traverseAST(node: Node): SyntaxKind[] {
    if (node) {
      let hashcode: SyntaxKind[] = []
      node.forEachChild((child_node: Node) => {
        switch (child_node.getKind()) {
          case SyntaxKind.Identifier:
            hashcode.push(SyntaxKind.Identifier)
            break
          case SyntaxKind.StringLiteral:
          case SyntaxKind.NumericLiteral:
            hashcode.push(child_node.getKind())
            break
          case SyntaxKind.FunctionDeclaration:
            hashcode.push(
              ...this.traverseAST(
                child_node.getFirstChildByKind(SyntaxKind.Block)
              )
            )
            break
          case SyntaxKind.VariableDeclarationList:
          case SyntaxKind.VariableStatement:
          case SyntaxKind.VariableDeclaration:
            hashcode.push(...this.traverseAST(child_node))
            break

          case SyntaxKind.ExpressionStatement:
          case SyntaxKind.BinaryExpression:
            hashcode.push(...this.traverseExpression(child_node))
            break
          default:
            console.log(
              'came in ',
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

  traverseExpression(node: Node): SyntaxKind[] {
    let hashcode: SyntaxKind[] = []
    node.forEachChild((child_node) => {
      switch (child_node.getKind()) {
        case SyntaxKind.Identifier:
          hashcode.push(child_node.getKind())
          break
        case SyntaxKind.BinaryExpression:
          hashcode.push(...this.traverseExpression(child_node))
          break
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
        case SyntaxKind.AsteriskToken:
        case SyntaxKind.AsteriskAsteriskToken:
        case SyntaxKind.SlashToken:
        case SyntaxKind.PercentToken:
          hashcode.push(child_node.getKind())
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
