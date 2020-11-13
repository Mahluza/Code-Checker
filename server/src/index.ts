import * as express from 'express'
import { authorize } from './authorization/authorization'

const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

const DetectionController = require('./controllers/DetectionController')
const UserController = require('./controllers/UserController')

const PORT = process.env.PORT || 4000

//Middlewares
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use((req, res, next) => authorize(req, res, next))

app.use(morgan('tiny'))

app.use('/detection', DetectionController)
app.use('/users', UserController)
//Routes

app.get('/', (req: express.Request, res: express.Response) => {})

app.listen(PORT, () => {
  console.log(`Started listening on port ${PORT}`)
})
