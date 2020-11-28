import SubmissionMatch from '../comparision/SubmissionMatch'
import InstructorModel from '../user/InstuctorModel'

export default class Message {
  sender: InstructorModel
  timestamp: number
  title: string
  messageBody: string
  submission: SubmissionMatch

  constructor(sender: InstructorModel, title: string, messageBody: string, submission: SubmissionMatch) {
    this.sender = sender
    this.timestamp = Date.now()
    this.title = title
    this.messageBody = messageBody
    this.submission = submission
  }

  toString(): string {
    return 'Hello ' + this.title
  }
}
