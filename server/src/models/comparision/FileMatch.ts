import CodeMatch from './CodeMatch'
import FileModel from '../content/FileModel'

export default class FileMatch {
  private codeMatches: CodeMatch[]
  private similarityPercetage: number

  constructor(private file1: FileModel, private file2: FileModel) {
    this.codeMatches = []
  }

  getFile1(): FileModel {
    return this.file1
  }

  getFile2(): FileModel {
    return this.file2
  }

  addCodeMatch(codeMatch: CodeMatch) {
    this.codeMatches.push(codeMatch)
  }

  getCodeMatches() {
    return this.codeMatches
  }

  setSimilarityPercentage(similarity: number) {
    this.similarityPercetage = similarity
  }

  getSimilarityPercentage(): number {
    return this.similarityPercetage
  }

  getSimilarities() {
    return this.codeMatches.map((codeMatch, ind) => {
      return {
        id: ind,
        codeMatch1: codeMatch.getCodeMatchOfFile1(),
        codeMatch2: codeMatch.getCodeMatchOfFile2(),
        similarity: codeMatch.getSimilarityPercentage(),
      }
    })
  }
}
