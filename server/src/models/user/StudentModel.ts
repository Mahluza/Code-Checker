import AbstractUserModel from './AbstractUserModel'
import Notification from '../schema/Notification'

export default class StudentModel extends AbstractUserModel {
  notifications: Array<Notification>
  constructor(firstName: string, lastName: string, institution: string, email: string, password: string) {
    super(firstName, lastName, institution, email, password)
    this.notifications = []
  }
  addNotification(notification: Notification) {
    this.notifications.push(notification)
  }
  getNotifications(): any {
    return this.notifications.map((notification) => {
      return {
        sender: notification.getSender().getUserDetails(),
        timestamp: notification.getTimestamp(),
        title: notification.getTitle(),
        body: notification.getBody(),
        submissionId: notification.getSubmission(),
      }
    })
  }
}
