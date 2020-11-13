import FileModel from './fileModel'
import { Project, Node, SourceFile, SyntaxKind, Identifier } from 'ts-morph'
import { start } from 'repl'

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
    // project.addSourceFileAtPath("./src/models/suspected.ts");
    const sourceFile = project.getSourceFileOrThrow('exp1.ts')
    //  const suspectedFile = project.getSourceFileOrThrow("suspected.ts");
    // sourceFile.
    const interfaces = sourceFile.getInterfaces()
    // console.log(interfaces.length);
    // this.printAST(sourceFile, 2);
    this.traverseAST(sourceFile)
    //this.astNodeSuspectedHashMap = this.traverseAST(suspectedFile);
    this.PrintMap()
    console.log('New world!!!!')
  }

  printAST(src: Node, acc: number) {
    // console.log("s", src.getChildSyntaxList());
    // if(acc>0){
    //     acc--;
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

  traverseExpression(src: Node): number {
    let hashValueforeachKind = 0
    src.forEachChild((node_el: Node) => {
      switch (node_el.getKind()) {
        case SyntaxKind.BinaryExpression:
          hashValueforeachKind += this.traverseExpression(node_el)
          break
        default:
          hashValueforeachKind += node_el.getKind()
          break
      }
    })
    return hashValueforeachKind
  }

  traverseStatement(src: Node): number {
    let hashValueforeachKind = 0
    src.forEachChild((node_el: Node) => {
      switch (node_el.getKind()) {
        case SyntaxKind.BinaryExpression:
          hashValueforeachKind += this.traverseExpression(node_el)
          break
        default:
          hashValueforeachKind += node_el.getKind()
          break
      }
    })

    return hashValueforeachKind
  }

  traverseAST(src: Node) {
    let hashValueforeachKind = 0
    src.forEachChild((node_el: Node) => {
      switch (node_el.getKind()) {
        // case SyntaxKind.NumericLiteral:
        // case SyntaxKind.Parameter:
        // case SyntaxKind.NumberKeyword
        // case SyntaxKind.Identifier: hashValueforeachDescendant += descendant.getKind();
        //                             console.log(hashValueforeachDescendant);
        //                             break;

        case SyntaxKind.Block:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.VariableStatement: //hashValueforeachKind+=node_el.getKind();
        case SyntaxKind.VariableDeclarationList:
          this.traverseAST(node_el)

        case SyntaxKind.ExpressionStatement: //startLine = node_el.getStartLineNumber();
          // this.traverseAST(node_el);
          break
        case SyntaxKind.VariableDeclaration:
          hashValueforeachKind += this.traverseStatement(node_el)
          this.astNodeHashMap.set(
            node_el.getStartLineNumber(),
            hashValueforeachKind
          )
          break
        case SyntaxKind.EndOfFileToken:
          break
        case SyntaxKind.BinaryExpression:
          break

          // default: hashValueforeachKind += node_el.getKind();
          //console.log(hashValueforeachDescendant);
          break
      }
    })

    hashValueforeachKind = 0
  }

  PrintMap() {
    console.log('length : ', this.astNodeHashMap.size)
    this.astNodeHashMap.forEach((value: number, key: number) => {
      console.log(key, value)
      console.log('\n')
    })
  }
}
