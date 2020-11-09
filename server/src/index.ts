import * as express from 'express';

const app = express();

app.use(express.json({type: "json"}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send("Team 18");
})

app.post('/', (req: express.Request, res: express.Response) => {
  console.log("req", req.body)
  res.status(200).send("Team 18");
})

app.listen(4000, () => {
  console.log("Started listening on port 4000");
});