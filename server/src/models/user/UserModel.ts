import IUserModel from './IUserModel'
import { UserDetails } from '../schema/UserDetails'

const bcrypt = require('bcryptjs')

export default abstract class UserModel implements IUserModel {
  private id: number
  private firstName: string
  private lastName: string
  private institution: string
  private email: string
  private passwordHash: string

  constructor(firstName: string, lastName: string, institution: string, email: string, password: string) {
    this.id = -1
    this.firstName = firstName
    this.lastName = lastName
    this.institution = institution
    this.email = email
    if (password) {
      this.passwordHash = bcrypt.hashSync(password, 10)
    } else {
      this.passwordHash = undefined
    }
  }

  setUserId(id: number): void {
    this.id = id
  }

  getFirstName(): string {
    return this.firstName
  }

  getLastName(): string {
    return this.lastName
  }

  getInstitution(): string {
    return this.institution
  }

  getEmail(): string {
    return this.email
  }

  getUserId(): number {
    return this.id
  }

  getUserDetails(): UserDetails {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      institution: this.institution,
      email: this.email,
    }
  }

  validate(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash)
  }
}
