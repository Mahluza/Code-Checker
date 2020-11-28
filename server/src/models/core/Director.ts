import IUserModel from '../user/IUserModel'
import UserModel from '../user/UserModel'

export default class Director {
  private static director: Director
  private userModelMapIndex: number = 0
  private userModelMap: Map<string, UserModel> = new Map()

  private constructor() {}

  public static instance(): Director {
    if (!Director.director) {
      Director.director = new Director()
    }
    return this.director
  }

  public addUserModel(email: string, model: UserModel) {
    this.userModelMap.set(email, model)
  }

  public getUserModel(email: string): UserModel {
    return this.userModelMap.get(email)
  }
}
