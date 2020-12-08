import AbstractUserModel from './AbstractUserModel'
/**
 * Builder to build different User objects - Student or Instructor
 */
export default interface IUserBuilder {
  /**
   * Builds user object with the details provided and based on the role
   */
  buildUser(
    firstName: string,
    lastName: string,
    institution: string,
    email: string,
    password: string,
    role: number
  ): AbstractUserModel
}
