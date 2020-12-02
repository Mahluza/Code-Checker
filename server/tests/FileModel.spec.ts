import { expect } from 'chai'
import FileModel from '../src/models/content/FileModel'
import ISyntaxTreeNode from '../src/models/content/ISyntaxTreeNode'

describe('tests for FileModel', () => {
  let file1: string = 'let a = 3\n let b = a + 3'
  let fModel = new FileModel('file1.ts', file1)
  let expectedSyntaxTree: ISyntaxTreeNode = undefined
  it('tests for createSyntaxTree', () => {
    expect(fModel.getSyntaxTree().getNodeType()).to.equal(294)
  })
})
