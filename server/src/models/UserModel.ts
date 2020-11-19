import IUserModel from './IUserModel'
import ProjectModel from './ProjectModel'
import { ProjectMetaData } from '../schema/ProjectMetaData'
import { UserDetails } from '../schema/UserDetails'

const bcrypt = require('bcryptjs')

export default class UserModel implements IUserModel {
  private firstName: string
  private lastName: string
  private institution: string
  private email: string
  private passwordHash: string
  private projects: Map<number, ProjectModel> = new Map()

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
    this.projects = new Map()
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

  getUserDetails(): UserDetails {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      institution: this.institution,
      email: this.email
    }
  }

  validate(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash)
  }

  createProject(name: string): number{
    let id = this.projects.size
    let projectModel = new ProjectModel(name, id)
    this.projects.set(id, projectModel)
    return id
  }

  getProjects(): ProjectMetaData[]{
    let projectDetails: ProjectMetaData[] = []
    this.projects.forEach((p, id) => {
      projectDetails.push(Object.assign({id: id}, p.getProjectMetaData()))
    })
    return projectDetails;
  }

  getProject(id: number){
    return this.projects.get(id);
  }

}
