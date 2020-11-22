import FileModel from './fileModel'
import ProjectModel from './ProjectModel'
import UserModel from './UserModel'

export default class Director {
  private static detectionMapIndex: number = 0
  private static userModelMap: Map<string, UserModel> = new Map()

  static addUserModel(email: string, model: UserModel) {
    this.userModelMap.set(email, model)
  }

  static getUserModel(email: string): UserModel {
    return this.userModelMap.get(email)
  }
}
