import Director from './Director'
import IBuilder from './IBuilder'
import UserModel from './UserModel'
const bcrypt = require('bcryptjs')

export default class DetectionBuilder implements IBuilder {

  buildUser(
    firstName: string,
    lastName: string,
    institution: string,
    email: string,
    password: string
  ): UserModel {
    if (Director.getUserModel(email)) {
      throw new Error("User already exists");
    }
    let userModel = new UserModel(
      firstName,
      lastName,
      institution,
      email,
      password
    )
    Director.addUserModel(email, userModel)
    return userModel
  }
}
