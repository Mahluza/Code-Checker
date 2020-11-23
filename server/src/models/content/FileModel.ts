import ASTProject from '../core/ASTProject'
import ISyntaxTreeNode from './ISyntaxTreeNode'
import SyntaxTreeBuilder from '../comparision/SyntaxTreeBuilder'

export default class FileModel {
  private syntaxTree: ISyntaxTreeNode

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

  createSyntaxTree() {
    const project = ASTProject.instance()
    const sourceFile = project.createSourceFile('__temp__.ts', this.content)
    sourceFile.fixUnusedIdentifiers()
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    this.syntaxTree = syntaxBuilder1.buildSyntaxTreeNode(sourceFile, '', syntaxBuilder1.buildAST(sourceFile))
    sourceFile.deleteImmediately()
  }
}
