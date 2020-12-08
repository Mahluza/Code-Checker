import { expect } from 'chai'
import CodeMatch from '../src/models/comparision/CodeMatch'
import FileMatch from '../src/models/comparision/FileMatch'
import SubmissionMatch from '../src/models/comparision/SubmissionMatch'
import FileModel from '../src/models/content/FileModel'
import SubmissionModel from '../src/models/content/SubmissionModel'
import SyntaxTreeNode from '../src/models/content/SyntaxTreeNode'
import StudentModel from '../src/models/user/StudentModel'

describe('tests for SubmissionMatch', () => {
  let file1: string = 'let a = 3'
  let file2: string = 'let b = 3'
  let fModel1 = new FileModel('file1.ts', file1, '')
  let fModel2 = new FileModel('file2.ts', file2, '')
  let file_match = new FileMatch(fModel1, fModel2)
  let student1: StudentModel = new StudentModel('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345', 2)
  let student2: StudentModel = new StudentModel('Tina', 'Maria', 'Neu', 'Tina.Maria@gmail.com', '123456', 2)
  let submissionModel1 = new SubmissionModel(student1)
  let submissionModel2 = new SubmissionModel(student2)
  let submissionMatch = new SubmissionMatch(submissionModel1, submissionModel2)
  let child1 = [new SyntaxTreeNode(229, 1, 1, '229.247.246.78.8', null)]
  let s1: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
  let s2: SyntaxTreeNode = new SyntaxTreeNode(294, 1, 1, '229.247.246.78.8', child1, [])
  let code_match = new CodeMatch(s1, s2, 100)
  file_match.setSimilarityPercentage(29)
  submissionMatch.addFileMatch(file_match)
  submissionMatch.setSimilarityPercentage(100)
  it('SubmissionMatch similarity percentage and summary for 2 submissions', () => {
    expect(submissionMatch.getSimilarityPercentage()).to.equal(100)
    expect(submissionMatch.getSimilarities()).to.deep.equal([
      {
        id: 0,
        file1: 'file1.ts',
        file2: 'file2.ts',
        similarity: 29,
        student1: 'Thomas.George@gmail.com',
        student2: 'Tina.Maria@gmail.com',
      },
    ])
  })

  it('SubmissionMatch observe a similarity for 2 submissions', () => {
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
