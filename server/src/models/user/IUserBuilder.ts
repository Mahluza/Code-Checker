import AbstractUserModel from './AbstractUserModel'

/**
 * Builder to build different User objects - Student or Instructor
 */
export default interface IUserBuilder {
  buildUser(
    firstName: string,
    lastName: string,
    institution: string,
    email: string,
    password: string,
    role: number
  ): AbstractUserModel
}
