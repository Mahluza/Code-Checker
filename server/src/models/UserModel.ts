import IUserModel from './IUserModel'

const bcrypt = require('bcryptjs')

export default class UserModel implements IUserModel {
  private firstName: string
  private lastName: string
  private institution: string
  private email: string
  private passwordHash: string

  constructor(
    firstName: string,
    lastName: string,
    institution: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.institution = institution
    this.email = email
    this.passwordHash = bcrypt.hashSync(password, 10)
  }
  getFirstName(): string {
    return this.firstName
  }
  getLastName(): string {
    return this.lastName
  }
  getFullName(): string {
    return this.getFirstName() + ' ' + this.getLastName()
  }
  getInstitution(): string {
    return this.institution
  }

  getEmail(): string {
    return this.email
  }

  validate(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash)
  }
}
