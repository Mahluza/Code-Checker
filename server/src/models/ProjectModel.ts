import Director from './Director'
import FileModel from './fileModel';
import IUserModel from './IUserModel'
import SubmissionModel from './SubmissionModel'
import UserModel from './UserModel'

export default class ProjectModel {
  private createdOn: Date;
  submissions: Map<string, SubmissionModel>

  constructor(private name: string, private id: number) {
    this.name = name
    this.submissions = new Map();
    this.createdOn = new Date();
  }

  getProjectMetaData() {
    return { name: this.name, createdOn: this.createdOn };
  }

  addToSubmission(email: string, file: any): void {
    if (!this.submissions.has(email)) {
      let student = Director.getUserModel(email);
      // to hold all submissions of this student for this project
      this.submissions.set(email, new SubmissionModel(student))
    }
    let submission = this.submissions.get(email);
    submission.addFile(file);
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
      for (let ind2 = ind1 + 1; ind2 < emails.length; ind2) {
        let email1 = emails[ind1]
        let email2 = emails[ind2]
        let sub1: SubmissionModel = this.submissions.get(email1)
        let sub2: SubmissionModel = this.submissions.get(email2)
        let files1: FileModel[] = sub1.getFiles();
        let files2: FileModel[] = sub2.getFiles();
        files1.forEach(file1 => {
          files2.forEach(file2 => {
            //detection logic
          })
        });
      }
    }
  }
}
