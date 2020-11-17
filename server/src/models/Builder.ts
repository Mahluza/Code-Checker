import DetectionModel from './DetectionModel'
import Director from './Director'
import FileModel from './fileModel'
import IBuilder from './IBuilder'
import IUserModel from './IUserModel'
import ProjectModel from './ProjectModel'
import UserModel from './UserModel'
const bcrypt = require('bcryptjs')

export default class DetectionBuilder implements IBuilder {
  buildProject(projectName: string, owner: IUserModel): ProjectModel {
    let projectModel = new ProjectModel(projectName, owner)
    Director.addProjectModel(projectModel)
    return projectModel
  }

  buildFile(): FileModel {
    let fileModel = new FileModel()
    Director.addFileModel(fileModel)
    return fileModel
  }
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
