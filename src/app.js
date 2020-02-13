import http from 'http';
import express from 'express';
// import socket from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import route from './routes';
/**
 * Setting up the App
 * Using bodyparser and cors middlewares
 * Using express Static files
 */

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(cors());

/**
 * Creating http server    
 */

const server = http.createServer(app);
/**
 * Setting up socket
 * 
 */
// const io = socket(server);
// io.on('connection', socket => {
//   console.log('made socket connection');
//   /**
//    * Handle chat event
//    */
//   socket.on('chat', (data) => {
//     io.sockets.emit('chat', data); 
//   });
  
//   socket.on('typing', data => {
//     socket.broadcast.emit('typing', data);
//   });
// });

const port = process.env.PORT || 3020;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

route(app);

export default app;
