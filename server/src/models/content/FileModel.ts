import { Project, SourceFile, SyntaxKind } from 'ts-morph'
import ASTProject from '../core/ASTProject'
import ISyntaxTreeNode from './ISyntaxTreeNode'
import SyntaxTreeBuilder from './SyntaxTreeBuilder'

export default class FileModel {
  private syntaxTree: ISyntaxTreeNode
  private numOfStatements: number

  constructor(private name: string, private content: string, encryption: string = 'sha256') {
    this.createSyntaxTree(encryption)
  }

  /**
   * Gets name of file
   */
  getName(): string {
    return this.name
  }

  /**
   * Gets content of file
   */
  getContent(): string {
    return this.content
  }

  /**
   * Gets syntax tree for file
   */
  getSyntaxTree() {
    return this.syntaxTree
  }

  /**
   * Gets number of statements present in the file
   */
  getNumberOfStatements(): number {
    return this.numOfStatements
  }

  /**
   * Helper function to understand the number of comments in the file
   */
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

  /**
   * Creates a syntax tree for a file name provided
   */
  createSyntaxTree(encryption = 'sha256') {
    //Singleton pattern to get instance
    const project: Project = ASTProject.instance()
    //temp file creation for getting AST
    const sourceFile: SourceFile = project.createSourceFile('__temp__.ts', this.content)
    //removing unused identifiers
    sourceFile.fixUnusedIdentifiers()
    let numOfStatements = sourceFile.getEndLineNumber()
    numOfStatements -= this.getCommentsInNode(sourceFile)
    this.numOfStatements = numOfStatements
    let syntaxBuilder1 = new SyntaxTreeBuilder(encryption)
    this.syntaxTree = syntaxBuilder1.buildRootNode(sourceFile)
    //deleting temp file
    sourceFile.deleteImmediately()
  }
}
