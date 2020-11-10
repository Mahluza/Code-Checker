import * as express from 'express';
import DetectionBuilder from '../models/DetectionBuilder';

let router = express.Router();

router.route("/create").post((req: express.Request, res: express.Response) => {
    let fileId1 = req.body.id1
    let fileId2 = req.body.id2
    let detectionBuilder = new DetectionBuilder();
    let detectionModel = detectionBuilder.buildDetection(fileId1, fileId2);
    detectionModel.run();
    res.status(200).send("Team 18");
})

module.exports = router;