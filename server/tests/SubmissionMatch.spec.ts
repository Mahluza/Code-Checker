import { expect } from 'chai'
import CodeMatch from '../src/models/comparision/CodeMatch'
import FileMatch from '../src/models/comparision/FileMatch'
import SubmissionMatch from '../src/models/comparision/SubmissionMatch'
import FileModel from '../src/models/content/FileModel'
import SyntaxTreeNode from '../src/models/content/SyntaxTreeNode'

describe('tests for SubmissionMatch', () => {
  let file1: string = 'let a = 3'
  let file2: string = 'let b = 3'
  let fModel1 = new FileModel('file1.ts', file1, '')
  let fModel2 = new FileModel('file2.ts', file2, '')
  let file_match = new FileMatch(fModel1, fModel2)
  let submissionMatch = new SubmissionMatch(undefined, undefined)
  let child1 = [new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)]
  let s1: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
  let s2: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
  let code_match = new CodeMatch(s1, s2, 100)
  file_match.setSimilarityPercentage(29)
  submissionMatch.addFileMatch(file_match)
  submissionMatch.setSimilarityPercentage(100)
  it('SubmissionMatch for 2 submissions', () => {
    expect(submissionMatch.getSimilarityPercentage()).to.equal(100)

    expect(submissionMatch.getSimilarities()).to.deep.equal([
      { id: 0, file1: 'file1.ts', file2: 'file2.ts', similarity: 29 },
    ])
  })

  it('SubmissionMatch for 2 submissions', () => {
    console.log(JSON.stringify(submissionMatch.getSimilarity(0)))
    expect(submissionMatch.getSimilarity(0)).to.deep.equal({
      file1: {
        name: 'file1.ts',
        content: 'let a = 3',
        numOfStatements: 1,
        syntaxTree: {
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
      },
      file2: {
        name: 'file2.ts',
        content: 'let b = 3',
        numOfStatements: 1,
        syntaxTree: {
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
      },
      codeMatches: [],
      similarityPercetage: 29,
    })
  })
})
