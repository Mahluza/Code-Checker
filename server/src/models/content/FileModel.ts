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

  createSyntaxTree() {
    const project = ASTProject.instance()
    const sourceFile = project.createSourceFile('__temp__.ts', this.content)
    //removing unused identifiers
    sourceFile.fixUnusedIdentifiers()
    //removing comments
    sourceFile.getStatementsWithComments()[0].remove()
    //getEndLine is returning 1 behind - probably 0 indexed
    let numOfStatements = sourceFile.getEndLineNumber() + 1
    numOfStatements -= sourceFile.getStatementsWithComments().length
    this.numOfStatements = numOfStatements
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    this.syntaxTree = syntaxBuilder1.buildRootNode(sourceFile)
    sourceFile.deleteImmediately()
  }
}
