import UserModel from './UserModel'
import Messages from '../schema/Messages'

export default class StudentModel extends UserModel {
  messages: Array<Messages>
  constructor(firstName: string, lastName: string, institution: string, email: string, password: string) {
    super(firstName, lastName, institution, email, password)
    this.messages = []
  }
  addMessage(message: Messages) {
    this.messages.push(message)
  }
  getMessages(): Array<Messages> {
    return this.messages
  }
}
