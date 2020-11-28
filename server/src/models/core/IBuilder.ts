import FileModel from '../content/FileModel'
import AbstractUserModel from '../user/AbstractUserModel'

export default interface IBuilder {
  buildUser(
    firstName: string,
    lastName: string,
    institution: string,
    email: string,
    password: string,
    role: number
  ): AbstractUserModel
}
