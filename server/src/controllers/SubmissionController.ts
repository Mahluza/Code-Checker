import * as express from 'express'
import Builder from '../models/user/UserBuilder'
import FileModel from '../models/content/FileModel'
import ProjectModel from '../models/content/ProjectModel'
import { SubmissionSchema } from '../models/schema/SubmissionSchema'
import InstructorModel from '../models/user/InstuctorModel'

let router = express.Router()

/**
 * Adds submissions to project
 */
router.route('').post((req: express.Request, res: express.Response) => {
  let owner: InstructorModel = req.body.user
  let projectId = req.body.projectId
  if (projectId === undefined) {
    res.status(200).send({ errMessage: 'ProjectId cannot be null/undefined.' })
  }
  let project = owner.getProject(Number(projectId))
  if (!project) {
    res.status(200).send({ errMessage: 'Project does not exist with given id' })
  }
  let submissions: SubmissionSchema[] = req.body.submissions
  submissions.map((submission: SubmissionSchema) => {
    let split: string[] = submission.file.name.split('.')
    let ext = split[split.length - 1]
    //only processing ts or js files
    if (['ts', 'js'].includes(ext)) {
      project.addToSubmission(submission.email, submission.file)
    }
  })
  res.status(200).send({ message: 'Submissions added to project' })
})

/**
 * Get the submission of a user from a project
 */
router.route('/:projectId/:email').get((req: express.Request, res: express.Response) => {
  let owner: InstructorModel = req.body.user
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

module.exports = router
