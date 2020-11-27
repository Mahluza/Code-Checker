import Director from './Director'
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

  getProjectMetaData(){
    return {name: this.name, createdOn: this.createdOn};
  }

  addToSubmission(email: string, file: any): void{
    if(!this.submissions.has(email)){
      let student = Director.getUserModel(email);
      // to hold all submissions of this student for this project
      this.submissions.set(email, new SubmissionModel(student))
    }
    let submission = this.submissions.get(email);
    submission.addFile(file);
  }

  getSubmission(email: string): SubmissionModel{
    return this.submissions.get(email)
  }

  getAllSubmissionInfo(){
    let submissionsInfo : any= {}
    this.submissions.forEach((submission, email) => {
      submissionsInfo[email] = submission.getMetaData()
    })
  }
}
