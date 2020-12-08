/**
 * Type to represent a Submission
 * Contains email of the student and the submission file contents
 */
export type SubmissionSchema = {
  email: string
  file: {
    name: string
    content: string
  }
}
