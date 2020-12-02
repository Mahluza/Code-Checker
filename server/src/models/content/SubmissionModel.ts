import FileModel from './FileModel'
import IUserModel from '../user/IUserModel'

export default class SubmissionModel {
  student: IUserModel
  files: Array<FileModel>

  constructor(student: IUserModel) {
    this.student = student
    this.files = []
  }

  /**
   * Adds the file as a FileModel to submission of user
   *
   * @param file file is an object holding name and content strings
   */
  addFile(file: { name: string; content: string }): void {
    this.files.push(new FileModel(file.name, file.content))
  }

  /**
   * Gets the files present in the submission
   */
  getFiles(): FileModel[] {
    return this.files
  }

  /**
   *Gets the metadata about files and the student to whom the submission belongs to
   */
  getMetaData() {
    let fileNames: string[] = []
    this.files.map((file: FileModel) => {
      fileNames.push(file.getName())
    })
    return Object.assign({ files: fileNames }, this.student.getUserDetails())
  }

  /**
   * Gets the data about all files in the submission
   */
  getData() {
    let submissionFiles: any = {}
    this.files.map((fileModel: FileModel) => {
      submissionFiles[fileModel.getName()] = fileModel.getContent()
    })
    return submissionFiles
  }

  /**
   * Gets the student to whom the submission belongs to
   */
  getUser(): IUserModel {
    return this.student
  }
}
