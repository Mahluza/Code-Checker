import * as express from 'express'
import { authorize } from './authorization/authorization'

const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
var cors = require('cors')

const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const SubmissionController = require('./controllers/SubmissionController')
const SimilarityController = require('./controllers/SimilarityController')

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
//Routes

app.get('/', (req: express.Request, res: express.Response) => {})

app.listen(PORT, () => {
  console.log(`Started listening on port ${PORT}`)
})
