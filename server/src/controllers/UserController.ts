import * as express from 'express'
import Builder from '../models/core/Builder'
import Director from '../models/core/Director'
import { generateToken } from '../authorization/authorization'
import StudentModel from '../models/user/StudentModel'
import InstructorModel from '../models/user/InstuctorModel'
import IUserModel from '../models/user/IUserModel'

let router = express.Router()

router.route('').post((req: express.Request, res: express.Response) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let institution = req.body.institution
  let email = req.body.email
  let password = req.body.password
  let role = parseInt(req.body.role)
  let builder = new Builder()
  let userModel = undefined
  try {
    userModel = builder.buildUser(firstName, lastName, institution, email, password, role)
    const accessToken = generateToken(userModel)
    res.status(200).send({ accessToken: accessToken, userDetails: userModel.getUserDetails() })
  } catch (error) {
    res.status(200).send({ errMessage: error.message })
  }
})

router.route('/validate').post((req: express.Request, res: express.Response) => {
  let email = req.body.email
  let password = req.body.password
  let userModel = Director.instance().getUserModel(email)
  if (userModel) {
    if (userModel.validate(password)) {
      const accessToken = generateToken(userModel)
      res.status(200).send({ accessToken: accessToken, userDetails: userModel.getUserDetails() })
    } else {
      res.status(200).send({ errMessage: 'Incorrect email/password' })
    }
  } else {
    res.status(200).send({ errMessage: 'User does not exist' })
  }
})

router.route('/message').post((req: express.Request, res: express.Response) => {
  let messageBody = req.body.messageBody
  let messageTitle = req.body.messageTitle
  let owner: InstructorModel = req.body.user
  let submissionId: number = req.body.submissionId
  let studentEmail: string = req.body.studentEmail
  let student: any = Director.instance().getUserModel(studentEmail)
  owner.sendMessage(student, messageTitle, messageBody, null)
  res.status(200).send({ result: 'success' })
})

router.route('/message').get((req: express.Request, res: express.Response) => {
  let loggedUser: StudentModel = req.body.user
  res.status(200).send({ messages: loggedUser.getMessages() })
})
module.exports = router
