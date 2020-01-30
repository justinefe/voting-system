"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _socket = _interopRequireDefault(require("socket.io"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = _interopRequireDefault(require("./routes"));

/**
 * Setting up the App
 * Using bodyparser and cors middlewares
 * Using express Static files
 */
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"]('public'));
app.use((0, _cors["default"])());
/**
 * Creating http server    
 */

var server = _http["default"].createServer(app);
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


var port = process.env.PORT || 3020;
server.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});
(0, _routes["default"])(app);
var _default = app;
exports["default"] = _default;