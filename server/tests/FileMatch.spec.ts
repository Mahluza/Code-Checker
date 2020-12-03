import { expect } from 'chai'
import CodeMatch from '../src/models/comparision/CodeMatch'
import FileMatch from '../src/models/comparision/FileMatch'
import FileModel from '../src/models/content/FileModel'
import SyntaxTreeNode from '../src/models/content/SyntaxTreeNode'

describe('tests for FileMatch', () => {
  let file1: string = 'let a = 3'
  let file2: string = 'let b = 3'
  let fModel1 = new FileModel('file1.ts', file1, '')
  let fModel2 = new FileModel('file2.ts', file2, '')
  let file_match = new FileMatch(fModel1, fModel2)
  let child1 = [new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)]
  let s1: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
  let s2: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
  let code_match = new CodeMatch(s1, s2, 100)
  file_match.addCodeMatch(code_match)
  it('FileMatch for files with simple statements', () => {
    expect(file_match.getSimilarities()).to.deep.equal([
      {
        id: 0,
        codeMatch: {
          node1: {
            nodeType: 294,
            startLineNumber: 1,
            endLineNumber: 1,
            hashCode: '229.247.246.78.8',
            children: [
              {
                nodeType: 229,
                startLineNumber: 1,
                endLineNumber: 1,
                hashCode: '229.247.246.78.8',
                children: null,
                commentLines: [],
              },
            ],
            commentLines: [],
          },
          node2: {
            nodeType: 294,
            startLineNumber: 1,
            endLineNumber: 1,
            hashCode: '229.247.246.78.8',
            children: [
              {
                nodeType: 229,
                startLineNumber: 1,
                endLineNumber: 1,
                hashCode: '229.247.246.78.8',
                children: null,
                commentLines: [],
              },
            ],
            commentLines: [],
          },
          type: 'COMPLETE_MATCH',
          rangeOfNode1: [1, 1],
          rangeOfNode2: [1, 1],
        },
        similarity: 100,
      },
    ])
  })
})
