import SubmissionMatch from '../comparision/SubmissionMatch'
import { UserDetails } from './UserDetails'

/**
 * Type to represent the Notification.
 */
export type NotificationSchema = {
  sender: UserDetails
  timestamp: Date
  title: String
  body: String
  submission: SubmissionMatch
}
