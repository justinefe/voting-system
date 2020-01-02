import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import route from './routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);
const port = process.env.PORT || 3020;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

route(app);

export default app;
