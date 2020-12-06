import { expect } from 'chai'
import FileModel from '../src/models/content/FileModel'
import SyntaxTreeNode from '../src/models/content/SyntaxTreeNode'

describe('tests for FileModel', () => {
  it('getName gets the name', () => {
    let file1: string = 'let a = 3'
    let fModel = new FileModel('file1.ts', file1, '')
    expect(fModel.getName()).to.equal('file1.ts')
  })

  it('getContent gets the content of file', () => {
    let file1: string = 'let a = 3'
    let fModel = new FileModel('file1.ts', file1, '')
    expect(fModel.getContent()).to.equal('let a = 3')
  })

  it('getNumberOfStatements gets number of statements in file', () => {
    let file1: string =
      '/**\n* Example JS Doc Comment\n* @example <caption>Comment example usage</caption>\n* // returns Number\n* exp.call(a, b);\n* @returns {Number} Returns the value of x \n*/let a = 3'
    let fModel = new FileModel('file1.ts', file1, '')
    expect(fModel.getNumberOfStatements()).to.equal(1)
  })

  it('createSyntaxTree creates the syntax tree as expected', () => {
    let file1: string = 'let a = 3'
    let fModel = new FileModel('file1.ts', file1, '')
    let childOfExpected = [new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)]
    let expectedSyntaxTree = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', childOfExpected)
    expect(fModel.getSyntaxTree()).to.deep.equal(expectedSyntaxTree)
  })

  it('createSyntaxTree creates the syntax tree with sha256 encryption constructs as expected', () => {
    let file1: string = 'let a = 3'
    let fModel = new FileModel('file1.ts', file1)
    let childOfExpected = [
      new SyntaxTreeNode(229, 1, 1, '67c385bc475ccedf3ef0290cf7dede20882a41d53a21db7ee3fddcefb907e558', null),
    ]
    let expectedSyntaxTree = new SyntaxTreeNode(
      294,
      1,
      1,
      '3371743a7cb73c62b5b6055c2944c4135d3d5fea54591f81b4c9924fc805dd03',
      childOfExpected
    )
    expect(fModel.getSyntaxTree()).to.deep.equal(expectedSyntaxTree)
  })

  it('createSyntaxTree with content having single line comments constructs as expected', () => {
    let file1: string = '//comment1 \n let a = 3'
    let fModel = new FileModel('file1.ts', file1, '')
    let childOfExpected = [new SyntaxTreeNode(229, 2, 2, '229.247.246.78.8', null)]
    let expectedSyntaxTree = new SyntaxTreeNode(294, 2, 2, '229.247.246.78.8', childOfExpected, [1])
    expect(fModel.getSyntaxTree()).to.deep.equal(expectedSyntaxTree)
  })

  it('createSyntaxTree with content having single line comments constructs as expected', () => {
    let file1: string = '/* comment2 */ \n let a = 3'
    let fModel = new FileModel('file1.ts', file1, '')
    let childOfExpected = [new SyntaxTreeNode(229, 2, 2, '229.247.246.78.8', null)]
    let expectedSyntaxTree = new SyntaxTreeNode(294, 2, 2, '229.247.246.78.8', childOfExpected, [1])
    expect(fModel.getSyntaxTree()).to.deep.equal(expectedSyntaxTree)
  })
})
