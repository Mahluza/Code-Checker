import IUserModel from './IUserModel'
import { UserDetails } from '../schema/UserDetails'

const bcrypt = require('bcryptjs')

/**
 * AbstractUserModel having the common attributes and functions for Users.
 */
export default abstract class AbstractUserModel implements IUserModel {
  private id: number
  private passwordHash: string

  constructor(
    private firstName: string,
    private lastName: string,
    private institution: string,
    private email: string,
    private role: number,
    password: string
  ) {
    this.id = -1
    this.firstName = firstName
    this.lastName = lastName
    this.institution = institution
    this.email = email
    this.role = role
    if (password) {
      this.passwordHash = bcrypt.hashSync(password, 10)
    } else {
      this.passwordHash = undefined
    }
  }

  /**
   * Sets the user id.
   */
  setUserId(id: number): void {
    this.id = id
  }

  /**
   * Returns the user's first name.
   */
  getFirstName(): string {
    return this.firstName
  }

  /**
   * Returns the user's last name.
   */
  getLastName(): string {
    return this.lastName
  }

  /**
   * Returns the institution name the user belongs to.
   */
  getInstitution(): string {
    return this.institution
  }

  /**
   * Returns the user's email id.
   */
  getEmail(): string {
    return this.email
  }

  /**
   * Returns the user's id.
   */
  getUserId(): number {
    return this.id
  }

  /**
   * Returns the user's role - Student or Instructor.
   */
  getRole(): number {
    return this.role
  }

  /**
   * Returns the user's details.
   */
  getUserDetails(): UserDetails {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      institution: this.institution,
      email: this.email,
      role: this.role,
    }
  }

  /**
   * Validates the user password.
   */
  validate(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash)
  }
}
