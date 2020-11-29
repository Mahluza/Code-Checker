import * as express from 'express'
import FileMatch from '../models/comparision/FileMatch'
import ProjectModel from '../models/content/ProjectModel'
import SubmissionMatch from '../models/comparision/SubmissionMatch'
import InstructorModel from '../models/user/InstuctorModel'

let router = express.Router()

/**
 * Gets similarity detail for the similarity id of the project
 *
 * similarityId here corresponds to submission match id of project
 */
router.route('/:projectId/:similarityId').get((req: express.Request, res: express.Response) => {
  let owner: InstructorModel = req.body.user
  let projectId = parseInt(req.params.projectId)
  let similarityId = parseInt(req.params.similarityId)
  let project: ProjectModel = owner.getProject(projectId)
  let submissionMatch: SubmissionMatch = project.getSimilarity(similarityId)
  res.status(200).send({ similarities: submissionMatch.getSimilarities() })
})

/**
 * Gets similarity details between files inside a submission of project
 *
 * similarityId here corresponds to file match id of project
 */
router.route('/:projectId/:submissionMatchId/:similarityId').get((req: express.Request, res: express.Response) => {
  let owner: InstructorModel = req.body.user
  let projectId = parseInt(req.params.projectId)
  let submissionMatchId = parseInt(req.params.submissionMatchId)
  let similarityId = parseInt(req.params.similarityId)
  let project: ProjectModel = owner.getProject(projectId)
  let submissionMatch: SubmissionMatch = project.getSimilarity(submissionMatchId)
  let fileMatch: FileMatch = submissionMatch.getSimilarity(similarityId)
  res.status(200).send({ similarities: fileMatch.getSimilarities(), file1: fileMatch.getFile1().getContent(), file2: fileMatch.getFile2().getContent() })
})

module.exports = router
