import { expect } from 'chai'
import InstructorModel from '../src/models/user/InstuctorModel'

describe('tests for InstructorModel', () => {
  let instructor1: InstructorModel = new InstructorModel('Thomas', 'George', 'Neu', 'Thomas.George@gmail.com', '12345')
  instructor1.setUserId(1)
  it('tests for getFirstName', () => {
    instructor1.createProject('Plagiarism Detector')
    expect(instructor1.getFirstName()).to.equal('Thomas')
    expect(instructor1.getUserId()).to.equal(1)
  })

  it('tests for getLastName', () => {
    expect(instructor1.getLastName()).to.equal('George')
  })

  it('tests for getInstitution', () => {
    expect(instructor1.getInstitution()).to.equal('Neu')
  })

  it('tests for getEmail', () => {
    expect(instructor1.getEmail()).to.equal('Thomas.George@gmail.com')
  })

  it('tests for validate', () => {
    expect(instructor1.validate('12345')).to.equal(true)
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
    expect(instructor1.getUserDetails()).to.deep.equal(user_details)
  })

  it('tests for getUserId', () => {
    instructor1.setUserId(1)
    expect(instructor1.getUserId()).to.equal(1)
  })
})
