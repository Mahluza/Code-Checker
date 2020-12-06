import { expect } from 'chai'
import InstructorModel from '../src/models/user/InstuctorModel'
import StudentModel from '../src/models/user/StudentModel'
import Notification from '../src/models/schema/Notification'
import UserBuilder from '../src/models/user/UserBuilder'
import IUserBuilder from '../src/models/user/IUserBuilder'
import Director from '../src/models/core/Director'

describe('tests for InstructorModel', () => {
  let instructor1: InstructorModel = new InstructorModel(
    'Thomas',
    'George',
    'Neu',
    'Thomas.George@gmail.com',
    '12345',
    1
  )
  instructor1.setUserId(1)
  it('getFirstName gets the first name', () => {
    instructor1.createProject('Plagiarism Detector')
    expect(instructor1.getFirstName()).to.equal('Thomas')
    expect(instructor1.getUserId()).to.equal(1)
  })

  it('getLastName gets the last name', () => {
    expect(instructor1.getLastName()).to.equal('George')
  })

  it('getInstitution gets the institution', () => {
    expect(instructor1.getInstitution()).to.equal('Neu')
  })

  it('getEmail gets the email', () => {
    expect(instructor1.getEmail()).to.equal('Thomas.George@gmail.com')
  })

  it('password validation works', () => {
    expect(instructor1.validate('12345')).to.equal(true)
  })

  it('getUserDetails gets the details', () => {
    type UserDetail = {
      email: string
      firstName: string
      id: number
      institution: string
      lastName: string
      role: number
    }
    let user_details: UserDetail = {
      email: 'Thomas.George@gmail.com',
      firstName: 'Thomas',
      id: 1,
      institution: 'Neu',
      lastName: 'George',
      role: 1,
    }
    expect(instructor1.getUserDetails()).to.deep.equal(user_details)
  })

  it('getUserId gets the user id', () => {
    instructor1.setUserId(1)
    expect(instructor1.getUserId()).to.equal(1)
  })

  it('getProjects gets  existing projects', () => {
    instructor1.setUserId(1)
    instructor1.createProject('Plagiarism Detector')
    let metadata = instructor1.getProjects()[0]
    expect(metadata.createdOn <= new Date()).to.equal(true)
    expect(metadata.name).to.equal('Plagiarism Detector')
  })

  it('getProject by id', () => {
    instructor1.setUserId(1)
    instructor1.createProject('Plagiarism Detector')
    let project_model = instructor1.getProject(1)
    expect(project_model.getProjectMetaData().createdOn <= new Date()).to.equal(true)
    expect(project_model.getProjectMetaData().name).to.equal('Plagiarism Detector')
  })

  it('notifying student works', () => {
    instructor1.setUserId(1)
    instructor1.createProject('MachineLearning')
    let student1: StudentModel = new StudentModel('aa', 'aaa', 'Neu', 'aa.aaa@gmail.com', '12345', 2)
    student1.setUserId(1)
    instructor1.notifyStudent(
      student1,
      'Plagiarism detected',
      'Plagiarism detected in Machine Learning Project',
      undefined
    )
    let notification = new Notification(
      instructor1,
      'Plagiarism detected',
      'Plagiarism detected in Machine Learning Project',
      undefined
    )
    student1.addNotification(notification)
    expect(student1.getNotifications()[0].body).to.equal('Plagiarism detected in Machine Learning Project')
  })

  it('creating instructor using Builder', () => {
    let builder: IUserBuilder = new UserBuilder()
    builder.buildUser('James', 'James', 'NEU', 'james@xyz.com', 'password', 1)
    expect(Director.instance().getUserModel('james@xyz.com').validate('password')).to.equal(true)
    expect(Director.instance().getUserModel('james@xyz.com').getRole()).to.equal(1)
  })

  it('creating instructor with already used email', () => {
    let builder: IUserBuilder = new UserBuilder()
    expect(() => builder.buildUser('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345', 1)).to.throw(Error)
  })
})
