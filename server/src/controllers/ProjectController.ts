import * as express from 'express'
import ProjectModel from '../models/content/ProjectModel'
import { ProjectMetaData } from '../models/schema/ProjectMetaData'
import InstructorModel from '../models/user/InstuctorModel'

let router = express.Router()

/**
 * Creates a project for owner
 */
router.route('').post((req: express.Request, res: express.Response) => {
  let owner: InstructorModel = req.body.user
  let name = req.body.projectName
  let projectId: number = owner.createProject(name)
  let project: ProjectModel = owner.getProject(projectId)
  res.status(200).send({ projectId: projectId, projectMetaData: project.getProjectMetaData() })
})

/**
 * Gets all the projects belonging to owner
 */
router.route('').get((req: express.Request, res: express.Response) => {
  let owner: InstructorModel = req.body.user
  let projectsInfo: ProjectMetaData[] = owner.getProjects()
  res.status(200).send({ projects: projectsInfo })
})

/**
 * Gets project details of given project id and the submissions belonging to it
 */
router.route('/:projectId').get((req: express.Request, res: express.Response) => {
  let owner: InstructorModel = req.body.user
  let projectId = parseInt(req.params.projectId)
  let project: ProjectModel = owner.getProject(Number(projectId))
  res.status(200).send({
    projectId: projectId,
    projectMetaData: project.getProjectMetaData(),
    submissions: project.getAllSubmissionInfo(),
    similarityResults: project.getSimilarities(),
  })
})

/**
 * Runs the detection process on files in the project specified
 */
router.route('/:projectId/runDetection').post((req: express.Request, res: express.Response) => {
  let owner: InstructorModel = req.body.user
  let projectId = parseInt(req.params.projectId)
  let project: ProjectModel = owner.getProject(projectId)
  project.runDetection()
  res.status(200).send({ result: 'Detection Complete' })
})

module.exports = router
