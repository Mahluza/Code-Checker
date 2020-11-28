import IUserModel from '../user/IUserModel'

export default class Director {
  private static director: Director
  private userModelMapIndex: number = 0
  private userModelMap: Map<string, IUserModel> = new Map()

  private constructor() {}

  public static instance(): Director {
    if (!Director.director) {
      Director.director = new Director()
    }
    return this.director
  }

  public addUserModel(email: string, model: IUserModel) {
    this.userModelMap.set(email, model)
  }

  public getUserModel(email: string): IUserModel {
    return this.userModelMap.get(email)
  }
}
