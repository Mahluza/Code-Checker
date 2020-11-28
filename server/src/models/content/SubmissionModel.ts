import FileModel from './FileModel'
import IUserModel from '../user/IUserModel'
import AbstractUserModel from '../user/AbstractUserModel'

export default class SubmissionModel {
  student: IUserModel
  files: Array<FileModel>

  constructor(student: IUserModel) {
    this.student = student
    this.files = []
  }

  addFile(file: any) {
    this.files.push(new FileModel(file.name, file.content))
  }

  getFiles(): FileModel[] {
    return this.files
  }

  getMetaData() {
    let fileNames: string[] = []
    this.files.map((file: FileModel) => {
      fileNames.push(file.getName())
    })
    return Object.assign({ files: fileNames }, this.student.getUserDetails())
  }

  getData() {
    let submissionFiles: any = {}
    this.files.map((fileModel: FileModel) => {
      submissionFiles[fileModel.getName()] = fileModel.getContent()
    })
    return submissionFiles
  }

  getUser() {
    return this.student
  }
}
