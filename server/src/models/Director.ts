import DetectionModel from './DetectionModel'
import FileModel from './fileModel'
import ProjectModel from './ProjectModel'
import UserModel from './UserModel'

export default class Director {
  private static detectionMapIndex: number = 0
  private static userModelMap: Map<string, UserModel> = new Map()
  private static detectionModelMap: Map<number, DetectionModel> = new Map()

  static addDetectionModel(model: DetectionModel): number {
    this.detectionMapIndex++
    this.detectionModelMap.set(this.detectionMapIndex, model)
    return this.detectionMapIndex
  }

  static addUserModel(email: string, model: UserModel) {
    this.userModelMap.set(email, model)
  }

  static getUserModel(email: string): UserModel {
    return this.userModelMap.get(email)
  }

  static getDetectionModel(id: number): DetectionModel {
    return this.detectionModelMap.get(id)
  }
}
