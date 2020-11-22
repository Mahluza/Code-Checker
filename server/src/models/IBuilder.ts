import FileModel from './fileModel'
import UserModel from './UserModel'

export default interface IBuilder {
  buildUser(firstName: string, lastName: string, institution: string, email: string, password: string): UserModel
}
