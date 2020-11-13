import * as express from 'express';
import Builder from '../models/Builder';
import Director from '../models/Director';

let router = express.Router();
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';

router.route("").post((req: express.Request, res: express.Response) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let institution = req.body.institution
    let email = req.body.email
    let password = req.body.password
    let builder = new Builder();
    let userModel = builder.buildUser(firstName, lastName, institution, email, password);
    res.status(200).send({"status": "success"});
})

router.route("/validate").post((req: express.Request, res: express.Response) => {
    let email = req.body.email
    let password = req.body.password
    let userModel = Director.getUserModel(email);
    if(userModel){
        if(userModel.validate(password)){
            const accessToken = jwt.sign({ username: email,  role: 1 }, accessTokenSecret);
            res.status(200).send({"result": true, "accessToken": accessToken});
        }else{
            res.status(200).send({"result": false, "message": "Incorrect email/password"});
        }
    }else{
        res.status(200).send({"result": false, "message": "User does not exist"});
    }
})

module.exports = router;