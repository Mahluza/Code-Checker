import * as express from 'express';
import Director from './models/Director';

const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';

const DetectionController = require("./controllers/DetectionController")
const UserController = require("./controllers/UserController")

const PORT = process.env.PORT || 4000;

//Middlewares
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(function(req, res, next) {
  if(req.url != "/users" && req.url !="/users/validate"){
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err: any, userDetails: any) => {
            if (err) {
                console.log("err", err)
                return res.sendStatus(403);
            }
            let user = Director.getUserModel(userDetails.username)
            req.body.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
  }
  else{
    next();
  }
});


app.use("/detection", DetectionController)
app.use("/users", UserController)
//Routes

app.get('/', (req: express.Request, res: express.Response) => {
})

app.listen(PORT, () => {
  console.log(`Started listening on port ${PORT}`);
});