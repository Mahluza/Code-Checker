import Director from '../core/Director'
import IUserBuilder from './IUserBuilder'
import AbstractUserModel from './AbstractUserModel'
import InstructorModel from './InstuctorModel'
import StudentModel from './StudentModel'

/**
 * Builder to build different User objects - Student or Instructor
 */
export default class UserBuilder implements IUserBuilder {
  private director: Director
  constructor() {
    this.director = Director.instance()
  }
  /**
   * Builds user object with the details provided and based on the role
   */
  buildUser(
    firstName: string,
    lastName: string,
    institution: string,
    email: string,
    password: string,
    role: number
  ): AbstractUserModel {
    if (this.director.getUserModel(email)) {
      throw new Error('User already exists')
    }
    let userModel
    if (role == 1) {
      userModel = new InstructorModel(firstName, lastName, institution, email, password, role)
    } else {
      userModel = new StudentModel(firstName, lastName, institution, email, password, role)
    }
    //store the user created at a higher level
    this.director.addUserModel(email, userModel)
    return userModel
  }
}
