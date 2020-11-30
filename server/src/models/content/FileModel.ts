import { Project, SourceFile, SyntaxKind } from 'ts-morph'
import ASTProject from '../core/ASTProject'
import ISyntaxTreeNode from './ISyntaxTreeNode'
import SyntaxTreeBuilder from './SyntaxTreeBuilder'

export default class FileModel {
  private syntaxTree: ISyntaxTreeNode
  private numOfStatements: number

  constructor(private name: string, private content: string) {
    //TODO: file meta data
    this.createSyntaxTree()
  }

  getName(): string {
    return this.name
  }

  getContent(): string {
    return this.content
  }

  getSyntaxTree() {
    return this.syntaxTree
  }

  getNumberOfStatements(): number {
    return this.numOfStatements
  }

  private getCommentsInNode(file: SourceFile): number {
    let nComments = 0
    file.getDescendantsOfKind(SyntaxKind.JSDocComment).map((c) => {
      nComments += c.getEndLineNumber() - c.getStartLineNumber() + 1
    })
    file.getDescendantsOfKind(SyntaxKind.MultiLineCommentTrivia).map((c) => {
      nComments += c.getEndLineNumber() - c.getStartLineNumber() + 1
    })
    file.getDescendantsOfKind(SyntaxKind.SingleLineCommentTrivia).map((c) => {
      nComments += c.getEndLineNumber() - c.getStartLineNumber() + 1
    })
    return nComments
  }

  createSyntaxTree() {
    const project: Project = ASTProject.instance()
    const sourceFile: SourceFile = project.createSourceFile('__temp__.ts', this.content)
    //removing unused identifiers
    sourceFile.fixUnusedIdentifiers()
    let numOfStatements = sourceFile.getEndLineNumber()
    numOfStatements -= this.getCommentsInNode(sourceFile)
    this.numOfStatements = numOfStatements
    let syntaxBuilder1 = new SyntaxTreeBuilder('sha256')
    this.syntaxTree = syntaxBuilder1.buildRootNode(sourceFile)
    sourceFile.deleteImmediately()
  }
}
