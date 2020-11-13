export default interface IUserModel {
  getEmail(): string
  getFirstName(): string
  getLastName(): string
  getFullName(): string
  getInstitution(): string
  validate(password: string): boolean
}
