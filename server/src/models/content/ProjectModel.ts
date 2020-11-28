import { computeSimilarityPercentageBetweenSubmissions, findSimilarities } from '../comparision/CompareUtil'
import Director from '../core/Director'
import FileMatch from '../comparision/FileMatch'
import FileModel from './FileModel'
import IUserModel from '../user/IUserModel'
import SubmissionMatch from '../comparision/SubmissionMatch'
import SubmissionModel from './SubmissionModel'
import AbstractUserModel from '../user/AbstractUserModel'
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

  getProjectMetaData() {
    return { name: this.name, createdOn: this.createdOn }
  }

  addToSubmission(email: string, file: any): void {
    if (!this.submissions.has(email)) {
      let student = Director.instance().getUserModel(email)
      if (!student) {
        let builder = new DetectionBuilder()
        builder.buildUser(undefined, undefined, undefined, email, undefined, undefined)
        student = Director.instance().getUserModel(email)
      }
      // to hold all submissions of this student for this project
      this.submissions.set(email, new SubmissionModel(student))
    }
    let submission = this.submissions.get(email)
    submission.addFile(file)
  }

  getSubmission(email: string): SubmissionModel {
    return this.submissions.get(email)
  }

  getAllSubmissionInfo() {
    let submissionsInfo: any = {}
    this.submissions.forEach((submission, email) => {
      submissionsInfo[email] = submission.getMetaData()
    })
  }

  runDetection() {
    let emails = Array.from(this.submissions.keys())
    for (let ind1 = 0; ind1 < emails.length - 1; ind1++) {
      for (let ind2 = ind1 + 1; ind2 < emails.length; ind2++) {
        let email1 = emails[ind1]
        let email2 = emails[ind2]
        let sub1: SubmissionModel = this.submissions.get(email1)
        let sub2: SubmissionModel = this.submissions.get(email2)
        let submissionMatch = new SubmissionMatch(sub1, sub2)
        let files1: FileModel[] = sub1.getFiles()
        let files2: FileModel[] = sub2.getFiles()
        files1.forEach((file1) => {
          files2.forEach((file2) => {
            findSimilarities(submissionMatch, file1, file2)
          })
        })
        let similarityPercentage = computeSimilarityPercentageBetweenSubmissions(submissionMatch)
        submissionMatch.setSimilarityPercentage(similarityPercentage)
        this.submissionMatches.push(submissionMatch)
      }
    }
  }

  getSimilarities() {
    return this.submissionMatches.map((subMatch, ind) => {
      return {
        id: ind,
        user1: subMatch.getUser1().getEmail(),
        user2: subMatch.getUser2().getEmail(),
        similarity: subMatch.getSimilarityPercentage(),
      }
    })
  }

  getSubmissionID(): number {
    return 0
  }

  getSimilarity(similarityId: number): SubmissionMatch {
    return this.submissionMatches[similarityId]
  }
}
