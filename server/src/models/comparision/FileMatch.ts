import CodeMatch from './CodeMatch'
import FileModel from '../content/FileModel'

/**
 * FileMatch represents the matches between two files of two users.
 * This has codematches representing individual matched blocks/lines of these files
 */
export default class FileMatch {
  private codeMatches: CodeMatch[]
  private similarityPercetage: number

  constructor(private file1: FileModel, private file2: FileModel) {
    this.codeMatches = []
    this.similarityPercetage = 0
  }

  /**
   * Returns file1 i.e. file of user1
   */
  getFile1(): FileModel {
    return this.file1
  }

  /**
   * Returns file2 i.e. file of user2
   */
  getFile2(): FileModel {
    return this.file2
  }

  /**
   * Add a new codematch i.e. code portions of these files that are identified as plagiarized to FileMatch.
   */
  addCodeMatch(codeMatch: CodeMatch): void {
    this.codeMatches.push(codeMatch)
  }

  /**
   * Gets all code matches in for files in the FileMatch
   */
  getCodeMatches(): CodeMatch[] {
    return this.codeMatches
  }

  /**
   * Sets the similarity percentage value for matches/plagiarized code between files of FileMatch.
   * @param similarity simlilarity percentage value
   */
  setSimilarityPercentage(similarity: number): void {
    this.similarityPercetage = similarity
  }

  /**
   * Returns the similarity percentage for filematch
   */
  getSimilarityPercentage(): number {
    return this.similarityPercetage
  }

  /**
   * Returns summary about all the code matches i.e. similarities with the files of FileMatch.
   */
  getSimilarities() {
    return this.codeMatches.map((codeMatch, ind) => {
      return {
        id: ind,
        codeMatch: codeMatch.getCodeMatch(),
        similarity: codeMatch.getSimilarityPercentage(),
      }
    })
  }
}
