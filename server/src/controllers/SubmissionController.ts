import * as express from 'express'
import Builder from '../models/core/Builder'
import FileModel from '../models/content/FileModel'
import ProjectModel from '../models/content/ProjectModel'
import UserModel from '../models/user/UserModel'
import { SubmissionSchema } from '../models/schema/SubmissionSchema'

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

router.route('/:projectId/:email').get((req: express.Request, res: express.Response) => {
  let owner: UserModel = req.body.user
  let projectId = parseInt(req.params.projectId)
  let studentEmail: string = req.params.email
  if (projectId === undefined) {
    res.status(200).send({ errMessage: 'ProjectId cannot be null/undefined.' })
  }
  let project = owner.getProject(projectId)
  if (!project) {
    res.status(200).send({ errMessage: 'Project does not exist with given id' })
  }
  let submission = project.getSubmission(studentEmail)
  if (!submission) {
    res.status(200).send({
      errMessage: 'Submission does not exist for the student in this project',
    })
  }
  res.status(200).send({ result: submission.getData() })
})

/**
 * For testing puporpose only
 *
 * TODO: Remove in submission
 */
router.route('/testProject').get((req: express.Request, res: express.Response) => {
  const fs = require('fs')
  const path = require('path')
  var util = require('util')
  const file1 = fs.readFileSync(path.resolve(__dirname, '../models/exp/exp1.ts'), 'utf8')
  const file2 = fs.readFileSync(path.resolve(__dirname, '../models/exp/exp2.ts'), 'utf8')
  let builder = new Builder()
  builder.buildUser('firstName1', 'lastName1', 'institution', 'user1', 'password')
  builder.buildUser('firstName2', 'lastName2', 'institution', 'user2', 'password')
  let project = new ProjectModel('Test Project', 2)
  project.addToSubmission('user1', {
    name: 'exp1.ts',
    content: file1.toString(),
  })
  project.addToSubmission('user2', {
    name: 'exp2.ts',
    content: file2.toString(),
  })
  project.runDetection()
  let similarities: any = []
  project.getSimilarities().map((info) => {
    similarities.push(project.getSimilarity(info.id))
  })
  res.status(200).send({
    result: 'Success',
    data: JSON.parse(JSON.stringify(similarities)),
  })
})

/**
 * For testing puporpose only
 *
 * TODO: Remove in submission
 */
router.route('/testAST').get((req: express.Request, res: express.Response) => {
  const fs = require('fs')
  const path = require('path')
  const file1 = fs.readFileSync(path.resolve(__dirname, '../models/exp/exp1.ts'), 'utf8')
  let fModel = new FileModel('file1.ts', file1.toString())
  res.status(200).send({
    result: 'Success',
    data: JSON.parse(JSON.stringify(fModel.getSyntaxTree())),
  })
})

module.exports = router
