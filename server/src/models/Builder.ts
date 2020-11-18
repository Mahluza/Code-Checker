import DetectionModel from './DetectionModel'
import Director from './Director'
import FileModel from './fileModel'
import IBuilder from './IBuilder'
import IUserModel from './IUserModel'
import ProjectModel from './ProjectModel'
import UserModel from './UserModel'
const bcrypt = require('bcryptjs')

export default class DetectionBuilder implements IBuilder {

  buildDetection(file1Id: number, file2Id: number): DetectionModel {
    // let file1 = Director.getFileModel(file1Id);
    // let file2 = Director.getFileModel(file2Id);
    let detectionModel = new DetectionModel(null, null)
    Director.addDetectionModel(detectionModel)
    return detectionModel
  }

  buildUser(
    firstName: string,
    lastName: string,
    institution: string,
    email: string,
    password: string
  ): UserModel {
    if(Director.getUserModel(email)){
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
