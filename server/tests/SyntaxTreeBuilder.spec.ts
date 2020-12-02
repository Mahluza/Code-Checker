import { expect } from 'chai'
import { Project, SourceFile } from 'ts-morph'
import ASTProject from '../src/models/core/ASTProject'
import SyntaxTreeBuilder from '../src/models/content/SyntaxTreeBuilder'
import SyntaxTreeNode from '../src/models/content/SyntaxTreeNode'

describe('tests for SyntaxTreeBuilder', () => {
  it('construction of syntax tree for simple statement', () => {
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    const project: Project = ASTProject.instance()
    let content: string = 'let a = 3'
    const sourceFile: SourceFile = project.createSourceFile('__temptest1__.ts', content)
    let childOfExpected = [new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)]
    let expectedSyntaxTree: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', childOfExpected, [])
    let actual = syntaxBuilder1.buildRootNode(sourceFile)
    sourceFile.deleteImmediately()
    expect(actual).to.deep.equal(expectedSyntaxTree)
  })

  it('construction of syntax tree for function', () => {
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    const project: Project = ASTProject.instance()
    let content: string = 'let a = 3 \n function() \n {let c = a + 1}'
    const sourceFile: SourceFile = project.createSourceFile('__temptest2__.ts', content)
    let child1 = new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)
    let child3 = new SyntaxTreeNode(229, 3, 3, '229.247.246.78.213.78.39.8', null)
    let child2 = new SyntaxTreeNode(248, 2, 3, '^229.247.246.78.213.78.39.8', [child3])

    let expectedSyntaxTree: SyntaxTreeNode = new SyntaxTreeNode(
      294,
      1,
      3,
      '229.247.246.78.8*^229.247.246.78.213.78.39.8',
      [child1, child2],
      []
    )
    let actual = syntaxBuilder1.buildRootNode(sourceFile)
    sourceFile.deleteImmediately()
    expect(actual).to.deep.equal(expectedSyntaxTree)
  })

  it('construction of syntax tree for while loop', () => {
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    const project: Project = ASTProject.instance()
    let content: string = 'let a = 3 \n while(a>0) \n {a--}'
    const sourceFile: SourceFile = project.createSourceFile('__temptest3__.ts', content)
    let child1 = new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)
    let child3 = new SyntaxTreeNode(230, 3, 3, '230.212.78', null)
    let child2 = new SyntaxTreeNode(233, 2, 3, 'ITERATION_STATEMENT 213.78.31.8^230.212.78', [child3])

    let expectedSyntaxTree: SyntaxTreeNode = new SyntaxTreeNode(
      294,
      1,
      3,
      '229.247.246.78.8*ITERATION_STATEMENT 213.78.31.8^230.212.78',
      [child1, child2],
      []
    )
    let actual = syntaxBuilder1.buildRootNode(sourceFile)
    sourceFile.deleteImmediately()
    expect(actual).to.deep.equal(expectedSyntaxTree)
  })

  it('construction of syntax tree for FOR loop', () => {
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    const project: Project = ASTProject.instance()
    let content: string = 'for(let a=3;a>0;a--) \n {let b = a}'
    const sourceFile: SourceFile = project.createSourceFile('__temptest4__.ts', content)
    let child1 = new SyntaxTreeNode(247, 1, 1, '229.247.246.78.8', null)
    let child3 = new SyntaxTreeNode(229, 2, 2, '229.247.246.78.78', null)
    let child4 = new SyntaxTreeNode(212, 1, 1, '230.212.78', null)
    let child2 = new SyntaxTreeNode(233, 1, 2, 'ITERATION_STATEMENT 213.78.31.8^229.247.246.78.78|230.212.78', [
      child3,
      child4,
    ])

    let expectedSyntaxTree: SyntaxTreeNode = new SyntaxTreeNode(
      294,
      1,
      2,
      '229.247.246.78.8*ITERATION_STATEMENT 213.78.31.8^229.247.246.78.78|230.212.78',
      [child1, child2],
      []
    )
    let actual = syntaxBuilder1.buildRootNode(sourceFile)
    sourceFile.deleteImmediately()
    expect(actual).to.deep.equal(expectedSyntaxTree)
  })

  it('construction of syntax tree for Do While loop', () => {
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    const project: Project = ASTProject.instance()
    let content: string = 'let a = 3 \n do{\n a--\n }while(a>0)'
    const sourceFile: SourceFile = project.createSourceFile('__temptest5__.ts', content)
    let child1 = new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)
    let child3 = new SyntaxTreeNode(230, 3, 3, '230.212.78', null)
    let child2 = new SyntaxTreeNode(233, 2, 4, 'ITERATION_STATEMENT 213.78.31.8^230.212.78', [child3])

    let expectedSyntaxTree: SyntaxTreeNode = new SyntaxTreeNode(
      294,
      1,
      4,
      '229.247.246.78.8*ITERATION_STATEMENT 213.78.31.8^230.212.78',
      [child1, child2],
      []
    )
    let actual = syntaxBuilder1.buildRootNode(sourceFile)
    sourceFile.deleteImmediately()
    expect(actual).to.deep.equal(expectedSyntaxTree)
  })

  it('construction of syntax tree for IF ELSE conditional statement', () => {
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    const project: Project = ASTProject.instance()
    let content: string = 'if(a%2 == 0){\n a = 0} \n else{\n a = 1}'
    const sourceFile: SourceFile = project.createSourceFile('__temptest6__.ts', content)
    let child4 = new SyntaxTreeNode(230, 4, 4, '230.213.78.62.8', null)
    let child2 = new SyntaxTreeNode(230, 2, 2, '230.213.78.62.8', null)
    let child3 = new SyntaxTreeNode(227, 3, 4, 'CONDITIONAL_ELSE_STATEMENT ^230.213.78.62.8', [child4])
    let child1 = new SyntaxTreeNode(231, 1, 4, 'CONDITIONAL_STATEMENT ()213.213.78.44.8.34.8^230.213.78.62.8', [child2])

    let expectedSyntaxTree: SyntaxTreeNode = new SyntaxTreeNode(
      294,
      1,
      4,
      'CONDITIONAL_ELSE_STATEMENT ^230.213.78.62.8*CONDITIONAL_STATEMENT ()213.213.78.44.8.34.8^230.213.78.62.8',
      [child1, child3],
      []
    )
    let actual = syntaxBuilder1.buildRootNode(sourceFile)
    sourceFile.deleteImmediately()
    expect(actual).to.deep.equal(expectedSyntaxTree)
  })

  it('construction of syntax tree for SWITCH CASE', () => {
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    const project: Project = ASTProject.instance()
    let content: string = 'switch(a){\n case 1: {b = 0 \n break} \n default: {b = 5}\n}'
    const sourceFile: SourceFile = project.createSourceFile('__temptest8__.ts', content, { overwrite: true })
    let child3 = new SyntaxTreeNode(230, 2, 2, '230.213.78.62.8', null)
    let child1 = new SyntaxTreeNode(231, 1, 5, 'CONDITIONAL_STATEMENT ()213.78.36.8^230.213.78.62.8', [child3])
    let child4 = new SyntaxTreeNode(230, 4, 4, '230.213.78.62.8', null)
    let child2 = new SyntaxTreeNode(227, 1, 5, 'CONDITIONAL_ELSE_STATEMENT ^230.213.78.62.8', [child4])

    let expectedSyntaxTree: SyntaxTreeNode = new SyntaxTreeNode(
      294,
      1,
      5,
      'CONDITIONAL_ELSE_STATEMENT ^230.213.78.62.8*CONDITIONAL_STATEMENT ()213.78.36.8^230.213.78.62.8',
      [child1, child2],
      []
    )
    let actual = syntaxBuilder1.buildRootNode(sourceFile)
    sourceFile.deleteImmediately()
    expect(actual).to.deep.equal(expectedSyntaxTree)
  })

  it('construction of syntax tree for ClASS', () => {
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    const project: Project = ASTProject.instance()
    let content: string = 'class abc{\n a: number\n getA():number{\nreturn a}\n}'
    const sourceFile: SourceFile = project.createSourceFile('__temptest8__.ts', content, { overwrite: true })
    let child2 = new SyntaxTreeNode(239, 4, 4, '239.78', null)
    let child4 = new SyntaxTreeNode(164, 3, 4, '^239.78', [child2])
    let child3 = new SyntaxTreeNode(162, 2, 2, '162.78.143', null)
    let child1 = new SyntaxTreeNode(249, 1, 5, '162.78.143#^239.78', [child3, child4])

    let expectedSyntaxTree: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 5, '162.78.143#^239.78', [child1], [])
    let actual = syntaxBuilder1.buildRootNode(sourceFile)
    sourceFile.deleteImmediately()
    expect(actual).to.deep.equal(expectedSyntaxTree)
  })

  it('construction of syntax tree for IF ELSE IF ELSE conditional statement', () => {
    let syntaxBuilder1 = new SyntaxTreeBuilder()
    const project: Project = ASTProject.instance()
    let content: string = 'if(a%2 == 0){\n a = 0} \n else if{\n a = 1} else{\n a = 3}'
    const sourceFile: SourceFile = project.createSourceFile('__temptest9__.ts', content)
    let child4 = new SyntaxTreeNode(230, 5, 5, '230.213.78.62.8', null)
    let child2 = new SyntaxTreeNode(230, 2, 2, '230.213.78.62.8', null)
    let child3 = new SyntaxTreeNode(231, 3, 5, 'CONDITIONAL_STATEMENT ()230.78^230.213.78.62.8', [child4])
    let child1 = new SyntaxTreeNode(231, 1, 5, 'CONDITIONAL_STATEMENT ()213.213.78.44.8.34.8^230.213.78.62.8', [child2])

    let expectedSyntaxTree: SyntaxTreeNode = new SyntaxTreeNode(
      294,
      1,
      5,
      'CONDITIONAL_STATEMENT ()213.213.78.44.8.34.8^230.213.78.62.8*CONDITIONAL_STATEMENT ()230.78^230.213.78.62.8',
      [child1, child3],
      []
    )
    let actual = syntaxBuilder1.buildRootNode(sourceFile)
    console.log(JSON.stringify(actual))
    sourceFile.deleteImmediately()
    expect(actual).to.deep.equal(expectedSyntaxTree)
  })
})
