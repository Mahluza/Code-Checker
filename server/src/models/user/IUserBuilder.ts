import AbstractUserModel from './AbstractUserModel'

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
