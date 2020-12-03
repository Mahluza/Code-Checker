import { expect } from 'chai'
import FileModel from '../src/models/content/FileModel'
import FileMatch from '../src/models/comparision/FileMatch'
import SubmissionMatch from '../src/models/comparision/SubmissionMatch'
import { computeSimilarityPercentageBetweenSubmissions, findSimilarities } from '../src/models/comparision/CompareUtil'
import ProjectModel from '../src/models/content/ProjectModel'
import StudentModel from '../src/models/user/StudentModel'
import SubmissionModel from '../src/models/content/SubmissionModel'

describe('tests for CompareUtil', () => {
  it('Similarities for 2 files with statements', () => {
    let file1: string = 'let a = 3 \n let b = 4'
    let file2: string = 'let b = 3 \n let b = 4'
    let fModel1 = new FileModel('file1.ts', file1, '')
    let fModel2 = new FileModel('file2.ts', file2, '')
    let sub_match = new SubmissionMatch(undefined, undefined)
    // console.log(JSON.stringify(findSimilarities(sub_match, fModel1, fModel2)))
    expect(findSimilarities(sub_match, fModel1, fModel2).getSimilarityPercentage()).to.equal(100)
  })

  it('Similarities for 2 files with some statements', () => {
    let file1: string = 'let a = 3 \n let c = a + 1'
    let file2: string = 'let b = 3 \n let d = b + 2'
    let fModel1 = new FileModel('file1.ts', file1, '')
    let fModel2 = new FileModel('file2.ts', file2, '')
    let sub_match = new SubmissionMatch(undefined, undefined)
    let expectedFileMatch = new FileMatch(fModel1, fModel2)
    let res = findSimilarities(sub_match, fModel1, fModel2)
    expect(findSimilarities(sub_match, fModel1, fModel2)).to.deep.equal(undefined)
  })

  it('tests for computeSimilarityPercentage', () => {
    let file1: string = 'let a = 3 \n function() \n {let c = a + 1}'
    let file2: string = 'let b = 3 \n function() \n {let d = b + 2}'
    let fModel1 = new FileModel('file1.ts', file1, '')
    let fModel2 = new FileModel('file2.ts', file2, '')
    // let pModel = new ProjectModel('project1', 1)
    // let student1: StudentModel = new StudentModel('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345')
    // let student2: StudentModel = new StudentModel('Tina', 'Maria', 'Neu', 'Tina.Maria@gmail.com', '67890')
    // let s1Model = new SubmissionModel(student1)
    // let s2Model = new SubmissionModel(student2)
    // s1Model.addFile({ name: 'file1.js', content: 'let a = 3 \n function() \n {let c = a + 1}' })
    // s2Model.addFile({ name: 'file2.js', content: 'let b = 3 \n function() \n {let d = b + 2}' })
    let submissionMatch = new SubmissionMatch(null, null)
    findSimilarities(submissionMatch, fModel1, fModel2)
    computeSimilarityPercentageBetweenSubmissions(submissionMatch)

    //console.log(JSON.stringify(findSimilarities(sub_match, fModel1, fModel2)))
    expect(computeSimilarityPercentageBetweenSubmissions(submissionMatch)).to.equal(100)
  })
})
