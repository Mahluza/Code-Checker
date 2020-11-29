import SubmissionMatch from '../comparision/SubmissionMatch'
import InstructorModel from '../user/InstuctorModel'

export default class Notification {
  private timestamp: Date

  constructor(
    private sender: InstructorModel,
    private title: string,
    private body: string,
    private submission: SubmissionMatch
  ) {
    this.sender = sender
    this.timestamp = new Date()
    this.title = title
    this.body = body
    this.submission = submission
  }

  getSender(): InstructorModel {
    return this.sender
  }

  getTimestamp(): Date {
    return this.timestamp
  }

  getTitle(): string {
    return this.title
  }

  getBody(): string {
    return this.body
  }

  getSubmission(): SubmissionMatch {
    return this.submission
  }
}
