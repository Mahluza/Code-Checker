import * as express from 'express'
import Builder from '../models/Builder'
import IUserModel from '../models/IUserModel'

let router = express.Router()

router.route('').post((req: express.Request, res: express.Response) => {
  let name = req.body.projectName
  let owner: IUserModel = req.body.user
  let builder = new Builder()
  let project = builder.buildProject(name, owner)
  res.status(200).send({ status: 'success', projectId: project.getProjectId() })
})

router.route('').get((req: express.Request, res: express.Response) => {
  res.status(200).send({ status: 'success' })
})
