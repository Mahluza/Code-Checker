import { expect } from 'chai'
import StudentModel from '../src/models/user/StudentModel'

describe('tests for StudentModel', () => {
  let student1: StudentModel = new StudentModel('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345')
  student1.setUserId(1)
  it('getFirstName gets the first name', () => {
    expect(student1.getFirstName()).to.equal('Thomas')
  })

  it('getLastName gets the last name', () => {
    expect(student1.getLastName()).to.equal('George')
  })

  it('getInstitution gets the institution', () => {
    expect(student1.getInstitution()).to.equal('Neu')
  })

  it('getEmail gets the email', () => {
    expect(student1.getEmail()).to.equal('Thomas.George@gmail.com')
  })

  it('password validation works', () => {
    expect(student1.validate('12345')).to.equal(true)
  })

  it('getUserDetails gets the details', () => {
    type UserDetail = {
      email: string
      firstName: string
      id: number
      institution: string
      lastName: string
    }

    let user_details: UserDetail = {
      email: 'Thomas.George@gmail.com',
      firstName: 'Thomas',
      id: 1,
      institution: 'Neu',
      lastName: 'George',
    }
    expect(student1.getUserDetails()).to.deep.equal(user_details)
  })

  it('getUserId gets the user id', () => {
    student1.setUserId(1)
    expect(student1.getUserId()).to.equal(1)
  })
})
