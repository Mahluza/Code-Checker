import { expect } from 'chai'
import FileModel from '../src/models/content/FileModel'
import FileMatch from '../src/models/comparision/FileMatch'
import SubmissionMatch from '../src/models/comparision/SubmissionMatch'
import { computeSimilarityPercentageBetweenSubmissions, findSimilarities } from '../src/models/comparision/CompareUtil'
import CodeMatch from '../src/models/comparision/CodeMatch'
import SyntaxTreeNode from '../src/models/content/SyntaxTreeNode'

describe('tests for CompareUtil', () => {
  it('Similarities for 2 files with statements', () => {
    let file1: string = 'let a = 3 \n let b = 4'
    let file2: string = 'let b = 3 \n let b = 4'
    let fModel1 = new FileModel('file1.ts', file1, '')
    let fModel2 = new FileModel('file2.ts', file2, '')
    let sub_match = new SubmissionMatch(undefined, undefined)
    expect(findSimilarities(sub_match, fModel1, fModel2).getSimilarityPercentage()).to.equal(100)
  })

  it('Similarities for 2 files with some statements', () => {
    let file1: string = 'let a = 3'
    let file2: string = 'let b = 3 + c'
    let fModel1 = new FileModel('file1.ts', file1, '')
    let fModel2 = new FileModel('file2.ts', file2, '')
    let sub_match = new SubmissionMatch(undefined, undefined)
    let file_match = new FileMatch(fModel1, fModel2)
    file_match.setSimilarityPercentage(29)
    sub_match.addFileMatch(file_match)
    sub_match.setSimilarityPercentage(90)
    let res = findSimilarities(sub_match, fModel1, fModel2)
    expect(findSimilarities(sub_match, fModel1, fModel2)).to.deep.equal({
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
        content: 'let b = 3 + c',
        numOfStatements: 1,
        syntaxTree: {
          nodeType: 294,
          startLineNumber: 1,
          endLineNumber: 1,
          hashCode: '229.247.246.78.213.8.39.78',
          children: [
            {
              nodeType: 229,
              startLineNumber: 1,
              endLineNumber: 1,
              hashCode: '229.247.246.78.213.8.39.78',
              children: null,
              commentLines: [],
            },
          ],
          commentLines: [],
        },
      },
      codeMatches: [],
      similarityPercetage: 0,
    })
  })

  it('tests for computeSimilarityPercentage', () => {
    let file1: string = 'let a = 3 \n function() \n {let c = a + 1}'
    let file2: string = 'let b = 3 \n function() \n {let d = b + 2}'
    let fModel1 = new FileModel('file1.ts', file1, '')
    let fModel2 = new FileModel('file2.ts', file2, '')
    let submissionMatch = new SubmissionMatch(null, null)
    findSimilarities(submissionMatch, fModel1, fModel2)
    computeSimilarityPercentageBetweenSubmissions(submissionMatch)
    expect(computeSimilarityPercentageBetweenSubmissions(submissionMatch)).to.equal(100)
  })

  it('tests for similarities in loops', () => {
    let file1: string = 'for(let a=3;a>0;a--) \n {let b = a}'
    let file2: string = 'let a = 3 \n while(a>0) \n {b = a--}'
    let fModel1 = new FileModel('file1.ts', file1, '')
    let fModel2 = new FileModel('file2.ts', file2, '')
    let sub_match = new SubmissionMatch(undefined, undefined)
    let file_match = new FileMatch(fModel1, fModel2)
    let s1: SyntaxTreeNode = getSyntaxTreeForLoop()
    let s2: SyntaxTreeNode = getSyntaxTreeWhileLoop()
    let code_match = new CodeMatch(s1, s2, 100)
    file_match.addCodeMatch(code_match)
    sub_match.addFileMatch(file_match)

    findSimilarities(sub_match, fModel1, fModel2)
    computeSimilarityPercentageBetweenSubmissions(sub_match)

    expect(computeSimilarityPercentageBetweenSubmissions(sub_match)).to.equal(100)
  })

  it('tests for no common code in 2 files', () => {
    let file1: string = 'if(a%2 == 0){\n a = 0} \n else{\n a = 1})'
    let file2: string = 'let a = 3 \n while(a>0) \n {b = a--}'
    let fModel1 = new FileModel('file1.ts', file1, '')
    let fModel2 = new FileModel('file2.ts', file2, '')
    let sub_match = new SubmissionMatch(undefined, undefined)
    findSimilarities(sub_match, fModel1, fModel2)
    expect(computeSimilarityPercentageBetweenSubmissions(sub_match)).to.equal(0)
  })

  it('tests for common code in 2 files 2', () => {
    let file1: string = 'function() \n {b = a++ \n let n = 5}'
    let file2: string = 'function() \n {b = a++ \n b = a * 2}'
    let fModel1 = new FileModel('file1.ts', file1, '')
    let fModel2 = new FileModel('file2.ts', file2, '')
    let sub_match = new SubmissionMatch(undefined, undefined)
    findSimilarities(sub_match, fModel1, fModel2)
    expect(computeSimilarityPercentageBetweenSubmissions(sub_match)).to.equal(34)
  })
})

function getSyntaxTreeForLoop(): SyntaxTreeNode {
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
  return expectedSyntaxTree
}

function getSyntaxTreeWhileLoop(): SyntaxTreeNode {
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
  return expectedSyntaxTree
}

function getSyntaxTreeIFCondition(): SyntaxTreeNode {
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
  return expectedSyntaxTree
}
