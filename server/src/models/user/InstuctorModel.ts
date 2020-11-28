import ProjectModel from '../content/ProjectModel'
import { ProjectMetaData } from '../schema/ProjectMetaData'
import StudentModel from './StudentModel'
import UserModel from './UserModel'
import Messages from '../schema/Messages'
import SubmissionMatch from '../comparision/SubmissionMatch'

export default class InstructorModel extends UserModel {
  private projects: Map<number, ProjectModel> = new Map()
  constructor(firstName: string, lastName: string, institution: string, email: string, password: string) {
    super(firstName, lastName, institution, email, password)
    this.projects = new Map()
  }

  createProject(name: string): number {
    let id = this.projects.size
    let projectModel = new ProjectModel(name, id)
    this.projects.set(id, projectModel)
    return id
  }

  getProjects(): ProjectMetaData[] {
    let projectDetails: ProjectMetaData[] = []
    this.projects.forEach((p, id) => {
      projectDetails.push(Object.assign({ id: id }, p.getProjectMetaData()))
    })
    return projectDetails
  }

  getProject(id: number) {
    return this.projects.get(id)
  }

  sendMessage(student: StudentModel, messageTitle: string, messageBody: string, submissionId: SubmissionMatch) {
    let message = new Messages(this, messageTitle, messageBody, null)
    student.addMessage(message)
  }
}
