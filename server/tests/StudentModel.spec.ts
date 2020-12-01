import { expect } from 'chai'
import StudentModel from '../src/models/user/StudentModel'

describe('tests for StudentModel', () => {
  let student1: StudentModel = new StudentModel('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345')
  student1.setUserId(1)
  it('tests for getFirstName', () => {
    expect(student1.getFirstName()).to.equal('Thomas')
  })

  it('tests for getLastName', () => {
    expect(student1.getLastName()).to.equal('George')
  })

  it('tests for getInstitution', () => {
    expect(student1.getInstitution()).to.equal('Neu')
  })

  it('tests for getEmail', () => {
    expect(student1.getEmail()).to.equal('Thomas.George@gmail.com')
  })

  it('tests for validate', () => {
    expect(student1.validate('12345')).to.equal(true)
  })

  it('tests for getUserDetails', () => {
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

  it('tests for getUserId', () => {
    student1.setUserId(1)
    expect(student1.getUserId()).to.equal(1)
  })
})
