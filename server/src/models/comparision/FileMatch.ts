import CodeMatch from './CodeMatch'
import FileModel from '../content/FileModel'

export default class FileMatch {
  private codeMatches: CodeMatch[]
  private similarityPercetage: number
  private commonLines: number

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

  setCommonLines(commonLines: number) {
    this.commonLines = commonLines
  }

  getCommonLines(): number {
    return this.commonLines
  }

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
