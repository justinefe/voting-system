import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3020;

app.listen( port, () => console.log(`app is running on ${port}`))

export default app;