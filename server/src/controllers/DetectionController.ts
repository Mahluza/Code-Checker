import * as express from 'express'
import Builder from '../models/Builder'
import IUserModel from '../models/IUserModel'

let router = express.Router()

router.route('/test').post((req: express.Request, res: express.Response) => {
  let user: IUserModel = req.body.user
  console.log('user ', user)
  res.status(200).send(user.getFullName())
})

module.exports = router
