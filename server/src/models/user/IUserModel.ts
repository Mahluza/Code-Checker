import { UserDetails } from '../schema/UserDetails'

export default interface IUserModel {
  getEmail(): string
  getFirstName(): string
  getLastName(): string
  getInstitution(): string
  getUserDetails(): UserDetails
  getRole(): number
  validate(password: string): boolean
}
