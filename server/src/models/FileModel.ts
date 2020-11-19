import ISyntaxTreeNode from './ISyntaxTreeNode'
import SyntaxTreeNode from './SyntaxTreeNode'
import ComparisonModel from './ComparisonModel'
import { HashString } from '../schema/HashString'
import SyntaxTreeBuilder from './SyntaxTreeBuilder'
import { Project } from 'ts-morph'

var crypto = require('crypto')

export default class FileModel {
  constructor(private name: string, private content: string) {
    //TODO: file meta data
  }

  getName(): string {
    return this.name
  }

  getContent(): string {
    return this.content
  }

  run() {
    const project = new Project()
    project.addSourceFileAtPath('./src/models/exp1.ts')
    project.addSourceFileAtPath('./src/models/suspected.ts')
    const sourceFile = project.getSourceFileOrThrow('exp1.ts')
    // const sourceFile2 = project.getSourceFileOrThrow('suspected.ts')

    let root1: ISyntaxTreeNode = undefined
    sourceFile.fixUnusedIdentifiers()
    let syntaxBuilder1 = new SyntaxTreeBuilder();
    root1 = syntaxBuilder1.buildSyntaxTreeNode(
      sourceFile,
      '',
      syntaxBuilder1.buildAST(sourceFile)
    )

    // this.printTreeNode(root1)
  }

  printTreeNode(treeNode: ISyntaxTreeNode) {
    let children = treeNode.getChildren()
    console.log('node Type->', treeNode.getNodeType())
    if (children != null)
      for (let i = 0; i < children.length; i++) {
        console.log(
          'Tree: nodetype->',
          children[i].getNodeType(),
          'hash->',
          children[i].getHashCode()
        )
        this.printTreeNode(children[i])
      }
  }
}
