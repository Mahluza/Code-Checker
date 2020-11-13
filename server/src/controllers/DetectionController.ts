import * as express from 'express';
import Builder from '../models/Builder';
import IUserModel from '../models/IUserModel';

let router = express.Router();

router.route("/create").get((req: express.Request, res: express.Response) => {
    let fileId1 = req.body.id1
    let fileId2 = req.body.id2
    let builder = new Builder();
    let detectionModel = builder.buildDetection(fileId1, fileId2);
    detectionModel.run();
    res.status(200).send("Team 18");
})

router.route("/test").post((req: express.Request, res: express.Response) => {
    let user: IUserModel = req.body.user
    console.log("user ", user)
    res.status(200).send(user.getFullName());
})

module.exports = router;