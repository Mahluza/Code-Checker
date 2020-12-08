import SubmissionMatch from '../comparision/SubmissionMatch'
import InstructorModel from '../user/InstuctorModel'

/**
 * Notification class to hold the notification information sent from instructor to student.
 */
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

  /**
   * Returns the Instructor who sends the notification.
   */
  getSender(): InstructorModel {
    return this.sender
  }

  /**
   * Returns the Date of the notification.
   */
  getTimestamp(): Date {
    return this.timestamp
  }

  /**
   * Returns the title of the notification.
   */
  getTitle(): string {
    return this.title
  }

  /**
   * Returns the content of the notification.
   */
  getBody(): string {
    return this.body
  }

  /**
   * Returns the SubmissionMatch found.
   */
  getSubmission(): SubmissionMatch {
    return this.submission
  }
}
