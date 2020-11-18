import IUserModel from './IUserModel'
import UserModel from './UserModel'

export default class ProjectModel {
  name: string
  owner: IUserModel
  projectId: number
  constructor(name: string, owner: IUserModel) {
    this.name = name
    this.owner = owner
    this.projectId = -1
  }

  setProjectId(pid: number) {
    this.projectId = pid
  }

  getProjectId(): number {
    return this.projectId
  }
}
