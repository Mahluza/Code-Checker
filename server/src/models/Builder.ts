import DetectionModel from "./DetectionModel";
import Director from "./Director";
import FileModel from "./fileModel";
import IDetectionBuilder from "./IBuilder";
import UserModel from "./UserModel";
const bcrypt = require('bcrypt')

export default class DetectionBuilder implements IDetectionBuilder {
  buildFile(id: number): FileModel {
    let fileModel = new FileModel();
    Director.setFileModel(id, fileModel);
    return fileModel;
  }
  buildDetection(file1Id: number, file2Id: number): DetectionModel {
    // let file1 = Director.getFileModel(file1Id);
    // let file2 = Director.getFileModel(file2Id);
    let detectionModel = new DetectionModel(null, null);
    Director.setDetectionModel(detectionModel);
    return detectionModel;
  }

buildUser(
    firstName: string,
    lastName: string,
    institution: string,
    email: string,
    password: string,
  ): UserModel {
    let userModel = new UserModel(firstName, lastName, institution, email, password);
    Director.setUserModel(email, userModel);
    return userModel;      
  }
}
