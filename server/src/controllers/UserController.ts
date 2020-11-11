import * as express from 'express';
import Builder from '../models/Builder';
import Director from '../models/Director';

let router = express.Router();

router.route("").post((req: express.Request, res: express.Response) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let institution = req.body.institution
    let email = req.body.email
    let password = req.body.password
    console.log("<<req, ", req.body)
    console.log("<<email, ", email)
    console.log("<<password, ", password)
    let builder = new Builder();
    let userModel = builder.buildUser(firstName, lastName, institution, email, password);
    res.status(200).send({"status": "success"});
})

router.route("/validate").post((req: express.Request, res: express.Response) => {
    let email = req.body.email
    let password = req.body.password
    let userModel = Director.getUserModel(email);
    if(userModel){
        res.status(200).send({"result": userModel.validate(password)});
    }else{
        res.status(200).send({"result": false});
    }
})

module.exports = router;