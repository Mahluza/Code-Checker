import { expect } from 'chai'
import ProjectModel from '../src/models/content/ProjectModel'

describe('tests for Project Model', () => {
  it('creation of ProjectModel works and getProjectMetaData returns metadata as expected', () => {
    let pModel = new ProjectModel('project1', 1)
    let metadata = pModel.getProjectMetaData()
    expect(metadata.name).to.equal('project1')
    expect(metadata.createdOn <= new Date()).to.equal(true)
  })

  it('getAllSubmissionInfo returns empty submissions when there are none', () => {
    let pModel = new ProjectModel('project1', 1)
    expect(pModel.getAllSubmissionInfo()).to.deep.equal({})
  })

  it('addToSubmission adds the submission to project', () => {
    let pModel = new ProjectModel('project1', 1)
    pModel.addToSubmission('xyz@neu.com', { name: 'file1.js', content: 'let a = 3' })
    expect(pModel.getAllSubmissionInfo()).to.deep.equal({
      'xyz@neu.com': {
        email: 'xyz@neu.com',
        files: ['file1.js'],
        firstName: undefined,
        id: -1,
        institution: undefined,
        lastName: undefined,
      },
    })
  })

  it('addToSubmission adds multiple submissions of a user to project', () => {
    let pModel = new ProjectModel('project1', 1)
    pModel.addToSubmission('xyz@neu.com', { name: 'file1.js', content: 'let n = 1' })
    pModel.addToSubmission('xyz@neu.com', { name: 'file2.js', content: 'let h = 29' })
    pModel.addToSubmission('xyz@neu.com', { name: 'file3.js', content: 'let s = 3' })
    expect(pModel.getAllSubmissionInfo()).to.deep.equal({
      'xyz@neu.com': {
        email: 'xyz@neu.com',
        files: ['file1.js', 'file2.js', 'file3.js'],
        firstName: undefined,
        id: -1,
        institution: undefined,
        lastName: undefined,
      },
    })
  })

  it('addToSubmission adds multiple submissions of multiple users to project', () => {
    let pModel = new ProjectModel('project1', 1)
    pModel.addToSubmission('xyz@neu.com', { name: 'file1.js', content: 'let n = 1' })
    pModel.addToSubmission('aaa@neu.com', { name: 'file2.js', content: 'let h = 29' })
    pModel.addToSubmission('xyz@neu.com', { name: 'file2.js', content: 'let s = 3' })
    pModel.addToSubmission('xyz@neu.com', { name: 'file3.js', content: 'let s = 3' })
    pModel.addToSubmission('abc@neu.com', { name: 'file1.js', content: 'let h = 29' })
    pModel.addToSubmission('aaa@neu.com', { name: 'file1.js', content: 'let p = 229' })
    expect(pModel.getAllSubmissionInfo()).to.deep.equal({
      'xyz@neu.com': {
        email: 'xyz@neu.com',
        files: ['file1.js', 'file2.js', 'file3.js'],
        firstName: undefined,
        id: -1,
        institution: undefined,
        lastName: undefined,
      },
      'aaa@neu.com': {
        email: 'aaa@neu.com',
        files: ['file2.js', 'file1.js'],
        firstName: undefined,
        id: -1,
        institution: undefined,
        lastName: undefined,
      },
      'abc@neu.com': {
        email: 'abc@neu.com',
        files: ['file1.js'],
        firstName: undefined,
        id: -1,
        institution: undefined,
        lastName: undefined,
      },
    })
  })

  it('similarity detection when having one user only should not report any plagiarism', () => {
    let pModel = new ProjectModel('project1', 1)
    pModel.addToSubmission('xyz@neu.com', { name: 'file1.js', content: 'let n = 1' })
    pModel.addToSubmission('xyz@neu.com', { name: 'file2.js', content: 'let h = 29' })
    pModel.addToSubmission('xyz@neu.com', { name: 'file3.js', content: 'let s = 3' })
    pModel.runDetection()
    expect(pModel.getSimilarities()).to.deep.equal([])
  })

  it('similarity detection should report plagiarism between two simple programs', () => {
    let pModel = new ProjectModel('project1', 1)
    pModel.addToSubmission('user1@neu.com', {
      name: 'file1.js',
      content: 'let a =1 \n let b =2 \n let c = a + b \n let d = c',
    })
    pModel.addToSubmission('user2@neu.com', {
      name: 'file1.js',
      content: 'let a =1 \n let b =2 \n let c = a + b \n let d = c',
    })
    pModel.runDetection()
    expect(pModel.getSimilarities()).to.deep.equal([
      {
        id: 0,
        similarity: 100,
        user1: 'user1@neu.com',
        user2: 'user2@neu.com',
      },
    ])
  })

  it('similarity detection should report plagiarism for simple programs between multiple users', () => {
    let pModel = new ProjectModel('project1', 1)
    pModel.addToSubmission('user1@neu.com', {
      name: 'file1.js',
      content: 'let a =1 \n let b =2 \n let c = a + b \n let d = c',
    })
    pModel.addToSubmission('user2@neu.com', {
      name: 'file2.js',
      content: 'let a =1 \n let b =2 \n let c = a + b \n let d = c',
    })
    pModel.addToSubmission('user3@neu.com', {
      name: 'file3.js',
      content: 'let a =1 \n let b =2 \n let c = a + b \n let d = c',
    })
    pModel.runDetection()
    expect(pModel.getSimilarities()).to.deep.equal([
      {
        id: 0,
        similarity: 100,
        user1: 'user1@neu.com',
        user2: 'user2@neu.com',
      },
      {
        id: 1,
        similarity: 100,
        user1: 'user1@neu.com',
        user2: 'user3@neu.com',
      },
      {
        id: 2,
        similarity: 100,
        user1: 'user2@neu.com',
        user2: 'user3@neu.com',
      },
    ])
  })
})
