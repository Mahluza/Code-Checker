import * as express from 'express'
import Builder from '../models/Builder'
import FileMatch from '../models/FileMatch'
import IUserModel from '../models/IUserModel'
import ProjectModel from '../models/ProjectModel'
import SubmissionMatch from '../models/SubmissionMatch'
import UserModel from '../models/UserModel'

let router = express.Router()

/**
 * Gets similarity detail for the similarity id of the project
 * 
 * similarityId here corresponds to submission match id of project
 */
router.route('/:projectId/:similarityId').get((req: express.Request, res: express.Response) => {
  let owner: UserModel = req.body.user
  let projectId = parseInt(req.params.projectId);
  let similarityId = parseInt(req.params.similarityId);
  let project: ProjectModel = owner.getProject(projectId);
  let submissionMatch: SubmissionMatch = project.getSimilarity(similarityId);
  res.status(200).send({ similarities: submissionMatch.getSimilarities() })
})

/**
 * Gets similarity details between files inside a submission of project
 * 
 * similarityId here corresponds to file match id of project
 */
router.route('/:projectId/:submissionMatchId/:similarityId').get((req: express.Request, res: express.Response) => {
  let owner: UserModel = req.body.user
  let projectId = parseInt(req.params.projectId);
  let submissionMatchId = parseInt(req.params.submissionMatchId);
  let similarityId = parseInt(req.params.similarityId);
  let project: ProjectModel = owner.getProject(projectId);
  let submissionMatch: SubmissionMatch = project.getSimilarity(submissionMatchId);
  let fileMatch: FileMatch = submissionMatch.getSimilarity(similarityId)
  res.status(200).send({ similarities: fileMatch.getSimilarities() })
})

module.exports = router
