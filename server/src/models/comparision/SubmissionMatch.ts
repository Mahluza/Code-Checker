import FileMatch from './FileMatch'
import SubmissionModel from '../content/SubmissionModel'

export default class SubmissionMatch {
  private fileMatches: FileMatch[]
  private similarityPercetage: number

  constructor(private sub1: SubmissionModel, private sub2: SubmissionModel) {
    this.fileMatches = []
  }

  getUser1() {
    return this.sub1.getUser()
  }

  getUser2() {
    return this.sub2.getUser()
  }

  addFileMatch(fileMatch: FileMatch) {
    this.fileMatches.push(fileMatch)
  }

  getFileMatches() {
    return this.fileMatches
  }

  setSimilarityPercentage(similarity: number) {
    this.similarityPercetage = similarity
  }

  getSimilarityPercentage(): number {
    return this.similarityPercetage
  }

  getSimilarities() {
    return this.fileMatches.map((fileMatch, ind) => {
      return {
        id: ind,
        file1: fileMatch.getFile1().getName(),
        student1: this.getUser1().getEmail(),
        file2: fileMatch.getFile2().getName(),
        student2: this.getUser2().getEmail(),
        similarity: fileMatch.getSimilarityPercentage(),
      }
    })
  }

  getSimilarity(similarityId: number) {
    return this.fileMatches[similarityId]
  }
}
