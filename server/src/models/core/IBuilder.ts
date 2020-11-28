import FileModel from '../content/FileModel'
import UserModel from '../user/UserModel'

export default interface IBuilder {
  buildUser(
    firstName: string,
    lastName: string,
    institution: string,
    email: string,
    password: string,
    role: number
  ): UserModel
}
