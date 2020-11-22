import * as express from 'express'
import Builder from '../models/Builder'
import Director from '../models/Director'
import FileModel from '../models/fileModel'
import IUserModel from '../models/IUserModel'
import ProjectModel from '../models/ProjectModel'
import UserModel from '../models/UserModel'
import { SubmissionSchema } from '../schema/SubmissionSchema'

let router = express.Router()

/**
 * Adds submissions to project
 */
router.route('').post((req: express.Request, res: express.Response) => {
  let owner: UserModel = req.body.user
  let projectId = req.body.projectId
  if (projectId === undefined) {
    res.status(200).send({ errMessage: 'ProjectId cannot be null/undefined.' })
  }
  let project = owner.getProject(projectId)
  if (!project) {
    res.status(200).send({ errMessage: 'Project does not exist with given id' })
  }
  let submissions: SubmissionSchema[] = req.body.submissions
  submissions.map((submission: SubmissionSchema) => {
    project.addToSubmission(submission.email, submission.file)
  })
  res.status(200).send({ message: 'Submissions added to project' })
})

router.route('/testProject').get((req: express.Request, res: express.Response) => {
  const fs = require('fs')
  const path = require("path");
  var util = require('util');
  const file1 = fs.readFileSync(path.resolve(__dirname, "../models/exp1.ts"), 'utf8');
  const file2 = fs.readFileSync(path.resolve(__dirname, "../models/exp2.ts"), 'utf8');
  let builder = new Builder()
  builder.buildUser(
    "firstName1",
    "lastName1",
    "institution",
    "user1",
    "password"
  )
  builder.buildUser(
    "firstName2",
    "lastName2",
    "institution",
    "user2",
    "password"
  )
  let project = new ProjectModel("Test Project", 2);
  project.addToSubmission("user1", { name: "exp1.ts", content: file1.toString() })
  project.addToSubmission("user2", { name: "exp2.ts", content: file2.toString() })
  project.runDetection()
  res.status(200).send({ result: 'Success', data: JSON.parse(JSON.stringify(project.getSimilarities())) })
})

router.route('/testAST').get((req: express.Request, res: express.Response) => {
  const fs = require('fs')
  const path = require("path");
  const file1 = fs.readFileSync(path.resolve(__dirname, "../models/exp1.ts"), 'utf8');
  let fModel = new FileModel("file1.ts", file1.toString())
  res.status(200).send({ result: 'Success', data: JSON.parse(JSON.stringify(fModel.getSyntaxTree())) })
})

router
  .route('/:projectId/:email')
  .get((req: express.Request, res: express.Response) => {
    let owner: UserModel = req.body.user
    let projectId = parseInt(req.params.projectId)
    let studentEmail: string = req.params.email
    if (projectId === undefined) {
      res
        .status(200)
        .send({ errMessage: 'ProjectId cannot be null/undefined.' })
    }
    let project = owner.getProject(projectId)
    if (!project) {
      res
        .status(200)
        .send({ errMessage: 'Project does not exist with given id' })
    }
    let submission = project.getSubmission(studentEmail)
    if (!submission) {
      res
        .status(200)
        .send({
          errMessage:
            'Submission does not exist for the student in this project',
        })
    }
    res.status(200).send({ result: submission.getData() })
  })

module.exports = router
