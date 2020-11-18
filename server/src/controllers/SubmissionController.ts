import * as express from 'express'
import Builder from '../models/Builder'
import Director from '../models/Director'
import IUserModel from '../models/IUserModel'
import UserModel from '../models/UserModel'
import { SubmissionSchema } from '../schema/SubmissionSchema'

let router = express.Router()

/**
 * Adds submissions to project
 */
router.route('').post((req: express.Request, res: express.Response) => {
  let owner: UserModel = req.body.user
  let projectId = req.body.projectId
  if(!projectId){
    res.status(200).send({ errMessage: "ProjectId cannot be null/undefined." })
  }
  let project = owner.getProject(projectId)
  if(!project){
    res.status(200).send({ errMessage: "Project does not exist with given id" })
  }
  let submissions: SubmissionSchema[] = req.body.submissions
  submissions.map((submission: SubmissionSchema) => {
    project.addToSubmission(submission.email, submission.content)
  })
  res.status(200).send({message: "Submissions added to project"})
})

router.route('/:projectId').get((req: express.Request, res: express.Response) => {
  let owner: UserModel = req.body.user
  let projectId = parseInt(req.params.projectId)
  let studentEmail: string = req.body.studentEmail;
  if(!projectId){
    res.status(200).send({ errMessage: "ProjectId cannot be null/undefined." })
  }
  let project = owner.getProject(projectId)
  if(!project){
    res.status(200).send({ errMessage: "Project does not exist with given id" })
  }
  let submission = project.getSubmission(studentEmail)
  res.status(200).send({result: submission.getData()})
})
module.exports = router
