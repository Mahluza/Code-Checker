import { UserDetails } from '../schema/UserDetails'

/**
 * IUserModel representing different users - student, instructor
 */
export default interface IUserModel {
  /**
   * Returns the user's email id.
   */
  getEmail(): string

  /**
   * Returns the user's first name.
   */
  getFirstName(): string

  /**
   * Returns the user's last name.
   */
  getLastName(): string

  /**
   * Returns the user's institution.
   */
  getInstitution(): string

  /**
   * Returns the user details.
   */
  getUserDetails(): UserDetails

  /**
   * Returns the user's role.
   */
  getRole(): number

  /**
   * Validates user's password
   */
  validate(password: string): boolean
}
