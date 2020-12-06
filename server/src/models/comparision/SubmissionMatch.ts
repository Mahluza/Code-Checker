import FileMatch from './FileMatch'
import SubmissionModel from '../content/SubmissionModel'
import IUserModel from '../user/IUserModel'

/**
 * SubmissionMatch represents the match between two submission of two users.
 * SubmissionMatch has FileMatches that holds matches between files with in the submissions.
 */
export default class SubmissionMatch {
  private fileMatches: FileMatch[]
  private similarityPercetage: number

  constructor(private sub1: SubmissionModel, private sub2: SubmissionModel) {
    this.fileMatches = []
  }

  /**
   * Returns user 1 of the submission match
   */
  getUser1(): IUserModel {
    return this.sub1.getUser()
  }

  /**
   * Returns user 2 of the submission match
   */
  getUser2(): IUserModel {
    return this.sub2.getUser()
  }

  /**
   * Adds the file match that has information about match between files belonging to the submissions
   */
  addFileMatch(fileMatch: FileMatch): void {
    this.fileMatches.push(fileMatch)
  }

  /**
   * Returns the file matches for SubmissionMatch i.e. files that matched between the two submissions.
   */
  getFileMatches(): FileMatch[] {
    return this.fileMatches
  }

  /**
   * Sets the similarity percentage value for matches/plagiarized code between two submissions.
   * @param similarity simlilarity percentage value
   */
  setSimilarityPercentage(similarity: number): void {
    this.similarityPercetage = similarity
  }

  /**
   * Returns the similarity percentage for submission match i.e. similarity between the submissions
   */
  getSimilarityPercentage(): number {
    return this.similarityPercetage
  }

  /**
   * Returns the summary about file matches with in the submission match
   */
  getSimilarities() {
    return this.fileMatches.map((fileMatch, ind) => {
      return {
        id: ind,
        file1: fileMatch.getFile1().getName(),
        file2: fileMatch.getFile2().getName(),
        similarity: fileMatch.getSimilarityPercentage(),
      }
    })
  }

  /**
   * Returns FileMatch with the given id in SubmissionMatch
   * @param similarityId id of the filematch within submission match
   */
  getSimilarity(similarityId: number): FileMatch {
    return this.fileMatches[similarityId]
  }
}
