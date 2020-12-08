import IUserModel from '../user/IUserModel'

/**
 * Director is a singleton instance which holds the users in our system.
 * We are using this design as we are not using any Database in the aplication.
 * We get the required user object and then from their we can extract whichever information we need.
 */
export default class Director {
  private static director: Director
  private userModelMap: Map<string, IUserModel> = new Map()

  private constructor() {}

  /**
   * Returns the instance of director
   */
  public static instance(): Director {
    if (!Director.director) {
      Director.director = new Director()
    }
    return this.director
  }

  /**
   * After registration add the user object to maintain the information.
   *
   * @param email email of user
   * @param model UserModel created for the user
   */
  public addUserModel(email: string, model: IUserModel) {
    this.userModelMap.set(email, model)
  }

  /**
   * Gets the user object based on the email.
   * @param email email of user
   */
  public getUserModel(email: string): IUserModel {
    return this.userModelMap.get(email)
  }
}
