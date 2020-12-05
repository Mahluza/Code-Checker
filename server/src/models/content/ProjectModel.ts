import { computeSimilarityPercentageBetweenSubmissions, findSimilarities } from '../comparision/CompareUtil'
import Director from '../core/Director'
import FileModel from './FileModel'
import SubmissionMatch from '../comparision/SubmissionMatch'
import SubmissionModel from './SubmissionModel'
import DetectionBuilder from '../core/Builder'

export default class ProjectModel {
  private createdOn: Date
  private submissions: Map<string, SubmissionModel>
  private submissionMatches: SubmissionMatch[]

  constructor(private name: string, private id: number) {
    this.name = name
    this.submissions = new Map()
    this.createdOn = new Date()
    this.submissionMatches = []
  }

  /**
   * Returns the metadata of the project
   */
  getProjectMetaData(): { name: string; createdOn: Date } {
    return { name: this.name, createdOn: this.createdOn }
  }

  /**
   * Adds the submission file to the user of email
   */
  addToSubmission(email: string, file: any): void {
    //if user already had submission in this project append file to it
    if (!this.submissions.has(email)) {
      let student = Director.instance().getUserModel(email)
      //if student not registered into system
      if (!student) {
        let builder = new DetectionBuilder()
        builder.buildUser(undefined, undefined, undefined, email, undefined, undefined)
        student = Director.instance().getUserModel(email)
      }
      // to hold all submissions of this student for this project
      this.submissions.set(email, new SubmissionModel(student))
    }
    let submission = this.submissions.get(email)
    //add the file to user submission
    submission.addFile(file)
  }

  /**
   * Gets the submission of user email provided
   */
  getSubmission(email: string): SubmissionModel {
    return this.submissions.get(email)
  }

  /**
   * Gets info about all submissions in the project
   */
  getAllSubmissionInfo() {
    let submissionsInfo: any = {}
    this.submissions.forEach((submission, email) => {
      submissionsInfo[email] = submission.getMetaData()
    })
    return submissionsInfo
  }

  /**
   * Starts detection process on the submissions present in this project
   */
  runDetection() {
    this.submissionMatches = []
    let emails = Array.from(this.submissions.keys())
    //For all possible combination of users
    for (let ind1 = 0; ind1 < emails.length - 1; ind1++) {
      for (let ind2 = ind1 + 1; ind2 < emails.length; ind2++) {
        let email1 = emails[ind1]
        let email2 = emails[ind2]
        //Getting submission of users
        let sub1: SubmissionModel = this.submissions.get(email1)
        let sub2: SubmissionModel = this.submissions.get(email2)
        //for all matches across the submissions of two users
        let submissionMatch = new SubmissionMatch(sub1, sub2)
        let files1: FileModel[] = sub1.getFiles()
        let files2: FileModel[] = sub2.getFiles()
        //for all files belonging to users
        files1.forEach((file1) => {
          files2.forEach((file2) => {
            findSimilarities(submissionMatch, file1, file2)
          })
        })
        //computing similarity percentage
        let similarityPercentage = computeSimilarityPercentageBetweenSubmissions(submissionMatch)
        //only add if its greater than 0 else no match
        if (similarityPercentage > 0) {
          submissionMatch.setSimilarityPercentage(similarityPercentage)
          this.submissionMatches.push(submissionMatch)
        }
      }
    }
  }

  /**
   * Gets info about all similarities among the submissions in the project
   */
  getSimilarities(): Array<{ id: number; user1: string; user2: string; similarity: number }> {
    return this.submissionMatches.map((subMatch, ind) => {
      return {
        id: ind,
        user1: subMatch.getUser1().getEmail(),
        user2: subMatch.getUser2().getEmail(),
        similarity: subMatch.getSimilarityPercentage(),
      }
    })
  }

  /**
   * Gets submission match for the given similarity id
   */
  getSimilarity(similarityId: number): SubmissionMatch {
    return this.submissionMatches[similarityId]
  }
}
