import SubmissionMatch from '../comparision/SubmissionMatch'
import { UserDetails } from './UserDetails'

export type NotificationSchema = {
  sender: UserDetails
  timestamp: Date
  title: String
  body: String
  submission: SubmissionMatch
}
