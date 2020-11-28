import Director from './Director'
import IBuilder from './IBuilder'
import UserModel from '../user/UserModel'
import InstructorModel from '../user/InstuctorModel'
import StudentModel from '../user/StudentModel'
const bcrypt = require('bcryptjs')

export default class DetectionBuilder implements IBuilder {
  private director: Director
  constructor() {
    this.director = Director.instance()
  }
  buildUser(
    firstName: string,
    lastName: string,
    institution: string,
    email: string,
    password: string,
    role: number
  ): UserModel {
    if (this.director.getUserModel(email)) {
      throw new Error('User already exists')
    }
    let userModel
    if (role == 1) userModel = new InstructorModel(firstName, lastName, institution, email, password)
    else userModel = new StudentModel(firstName, lastName, institution, email, password)

    this.director.addUserModel(email, userModel)
    return userModel
  }
}
