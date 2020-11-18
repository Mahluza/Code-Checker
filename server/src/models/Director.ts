import DetectionModel from './DetectionModel'
import FileModel from './fileModel'
import ProjectModel from './ProjectModel'
import UserModel from './UserModel'

export default class Director {
  private static fileMapIndex: number = 0
  private static detectionMapIndex: number = 0
  private static projectMapIndex: number = 0
  private static userModelMap: Map<string, UserModel> = new Map()
  private static projectModelMap: Map<number, ProjectModel> = new Map()
  private static fileModelMap: Map<number, FileModel> = new Map()
  private static detectionModelMap: Map<number, DetectionModel> = new Map()

  static addFileModel(model: FileModel): number {
    this.fileMapIndex++
    this.fileModelMap.set(this.fileMapIndex, model)
    return this.fileMapIndex
  }

  static addDetectionModel(model: DetectionModel): number {
    this.detectionMapIndex++
    this.detectionModelMap.set(this.detectionMapIndex, model)
    return this.detectionMapIndex
  }

  static addUserModel(email: string, model: UserModel) {
    this.userModelMap.set(email, model)
  }

  static addProjectModel(model: ProjectModel) {
    this.projectMapIndex++
    model.setProjectId(this.projectMapIndex)
    this.projectModelMap.set(this.projectMapIndex, model)
    return this.projectMapIndex
  }

  static getUserModel(email: string): UserModel {
    return this.userModelMap.get(email)
  }

  static getDetectionModel(id: number): DetectionModel {
    return this.detectionModelMap.get(id)
  }

  static getProjectModel(id: number): ProjectModel {
    return this.projectModelMap.get(id)
  }

  static getFileModel(id: number): FileModel {
    return this.fileModelMap.get(id)
  }
}
