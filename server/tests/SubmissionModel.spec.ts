import { expect } from 'chai'
import SubmissionModel from '../src/models/content/SubmissionModel'
import StudentModel from '../src/models/user/StudentModel'

describe('tests for Submission Model', () => {
  it('submission creation for a student works as expected', () => {
    let student1: StudentModel = new StudentModel('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345', 2)
    let sModel = new SubmissionModel(student1)
    expect(sModel.getUser()).to.deep.equal(student1)
  })

  it('empty submission should not have any files', () => {
    let student1: StudentModel = new StudentModel('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345', 2)
    let sModel = new SubmissionModel(student1)
    expect(sModel.getFiles().length).to.equal(0)
    expect(sModel.getMetaData()).to.deep.equal({
      email: 'Thomas.George@gmail.com',
      files: [],
      firstName: 'Thomas',
      id: -1,
      institution: 'Neu',
      lastName: 'George',
      role: 2,
    })
  })

  it('add file to submission model adds the file to submission', () => {
    let student1: StudentModel = new StudentModel('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345', 2)
    let sModel = new SubmissionModel(student1)
    sModel.addFile({ name: 'file1.js', content: 'let a = 3' })
    expect(sModel.getFiles().length).to.equal(1)
    expect(sModel.getMetaData()).to.deep.equal({
      email: 'Thomas.George@gmail.com',
      files: ['file1.js'],
      firstName: 'Thomas',
      id: -1,
      institution: 'Neu',
      lastName: 'George',
      role: 2,
    })
  })

  it('submission model get data returns the file content correctly', () => {
    let student1: StudentModel = new StudentModel('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345', 2)
    let sModel = new SubmissionModel(student1)
    sModel.addFile({ name: 'file1.js', content: 'let a = 3' })
    expect(sModel.getData()).to.deep.equal({ 'file1.js': 'let a = 3' })
  })

  it('submission model works as expected with multiple files', () => {
    let student1: StudentModel = new StudentModel('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345', 2)
    let sModel = new SubmissionModel(student1)
    sModel.addFile({ name: 'file1.js', content: 'let a = 3' })
    sModel.addFile({ name: 'file2.js', content: 'let b = 4' })
    sModel.addFile({ name: 'file3.js', content: 'let c = 29' })
    expect(sModel.getData()).to.deep.equal({
      'file1.js': 'let a = 3',
      'file2.js': 'let b = 4',
      'file3.js': 'let c = 29',
    })
  })
})
