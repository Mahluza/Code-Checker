import AbstractUserModel from './AbstractUserModel'
import Notification from '../schema/Notification'
import { NotificationSchema } from '../schema/NotificationSchema'

export default class StudentModel extends AbstractUserModel {
  notifications: Array<Notification>
  constructor(firstName: string, lastName: string, institution: string, email: string, password: string, role: number) {
    super(firstName, lastName, institution, email, role, password)
    this.notifications = []
  }

  /**
   * To add notification sent by the Instructor to the Student dashboard.
   */
  addNotification(notification: Notification) {
    this.notifications.push(notification)
  }

  /**
   * Gets all the notifications received by the student
   */
  getNotifications(): NotificationSchema[] {
    return this.notifications.map((notification) => {
      return {
        sender: notification.getSender().getUserDetails(),
        timestamp: notification.getTimestamp(),
        title: notification.getTitle(),
        body: notification.getBody(),
        submission: notification.getSubmission(),
      }
    })
  }
}
