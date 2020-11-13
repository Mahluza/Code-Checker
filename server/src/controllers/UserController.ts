import * as express from 'express';
import Builder from '../models/Builder';
import Director from '../models/Director';
import {generateToken} from "../authorization/authorization";

let router = express.Router();

router.route("").post((req: express.Request, res: express.Response) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let institution = req.body.institution
    let email = req.body.email
    let password = req.body.password
    let builder = new Builder();
    let userModel = builder.buildUser(firstName, lastName, institution, email, password);
    const accessToken = generateToken(userModel);
    res.status(200).send({"status": "success", "accessToken": accessToken});
})

router.route("/validate").post((req: express.Request, res: express.Response) => {
    let email = req.body.email
    let password = req.body.password
    let userModel = Director.getUserModel(email);
    if(userModel){
        if(userModel.validate(password)){
            const accessToken = generateToken(userModel);
            res.status(200).send({"result": true, "accessToken": accessToken});
        }else{
            res.status(200).send({"result": false, "message": "Incorrect email/password"});
        }
    }else{
        res.status(200).send({"result": false, "message": "User does not exist"});
    }
})

module.exports = router;