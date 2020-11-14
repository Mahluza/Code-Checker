import * as express from 'express'
import Builder from '../models/Builder'
import Director from '../models/Director'
import IUserModel from '../models/IUserModel'

let router = express.Router()

router.route('').post((req: express.Request, res: express.Response) => {
  let projectId = req.body.projectId
  let files = req.body.files
  let projectModel = Director.getProjectModel(projectId)
  let builder = new Builder()
  // let fileModel = builder.buildSubmission(projectModel, files)
  // fileModel.run()
  res.status(200).send('Team 18')
})

router.route('/test').get((req: express.Request, res: express.Response) => {
  let builder = new Builder()
  let fileModel = builder.buildFile()
  fileModel.run()
  res.status(200).send('Team 18')
})
