import * as express from 'express'
import { authorize } from './authorization/authorization'
import Builder from './models/core/Builder'

const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
var cors = require('cors')

const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const SubmissionController = require('./controllers/SubmissionController')
const SimilarityController = require('./controllers/SimilarityController')
const RootController = require('./controllers/RootController')

const PORT = process.env.PORT || 4000

//Middlewares
app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.use((req, res, next) => authorize(req, res, next))

app.use(morgan('tiny'))

app.use('/users', UserController)
app.use('/project', ProjectController)
app.use('/submission', SubmissionController)
app.use('/similarity', SimilarityController)
//app.use('/', RootController)
//Routes

app.get('/', (req: express.Request, res: express.Response) => {})

app.listen(PORT, () => {
  console.log(`Started listening on port ${PORT}`)
  //TODO: Remove in submission
  let builder = new Builder()
  builder.buildUser('firstName', 'lastName', 'institution', 'aaa', 'aaa', 1)
})
