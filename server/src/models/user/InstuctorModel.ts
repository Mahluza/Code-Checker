import ProjectModel from '../content/ProjectModel'
import { ProjectMetaData } from '../schema/ProjectMetaData'
import StudentModel from './StudentModel'
import AbstractUserModel from './AbstractUserModel'
import Notification from '../schema/Notification'
import SubmissionMatch from '../comparision/SubmissionMatch'

export default class InstructorModel extends AbstractUserModel {
  private projects: Map<number, ProjectModel> = new Map()
  constructor(firstName: string, lastName: string, institution: string, email: string, password: string, role: number) {
    super(firstName, lastName, institution, email, role, password)
    this.projects = new Map()
  }

  /**
   * Creates a project repository to hold students' submissions.
   */
  createProject(name: string): number {
    let id = this.projects.size
    let projectModel = new ProjectModel(name, id)
    this.projects.set(id, projectModel)
    return id
  }

  /**
   * Returns projects owned by the Instructor.
   */
  getProjects(): ProjectMetaData[] {
    let projectDetails: ProjectMetaData[] = []
    this.projects.forEach((p, id) => {
      projectDetails.push(Object.assign({ id: id }, p.getProjectMetaData()))
    })
    return projectDetails
  }

  /**
   * Returns project associated with the project id.
   */
  getProject(id: number) {
    return this.projects.get(id)
  }

  /**
   * Notifies student about detection of plagiarised code.
   */
  notifyStudent(student: StudentModel, messageTitle: string, messageBody: string, submissionMatch: SubmissionMatch) {
    let notification = new Notification(this, messageTitle, messageBody, null)
    student.addNotification(notification)
  }
}
