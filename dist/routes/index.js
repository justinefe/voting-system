"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var _registration = _interopRequireDefault(require("./registration"));

var _candidate = _interopRequireDefault(require("./candidate"));

var _reatime = _interopRequireDefault(require("./reatime"));

var _adminisrtation = _interopRequireDefault(require("./adminisrtation"));

var _vote = _interopRequireDefault(require("./vote"));

/* eslint-disable require-jsdoc */

/* eslint-disable quote-props */
// import swaggerUi from 'swagger-ui-express';
// import swaggerDoc from '../../public/docs/swaggerDoc.json';
// import notifications from './notifications';
var _default = function _default(app) {
  app.get('/', function (req, res) {
    return res.status(200).send({
      status: 'success',
      data: 'Welcome to the online voting system API'
    });
  });
  app.use('/api/v1', [_user["default"], _registration["default"], _adminisrtation["default"], _candidate["default"], _vote["default"], _reatime["default"]]); // Add notification endpoints to application
  //   app.use('/api/v1/notifications', notifications);
  //   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.all('/*', function (req, res) {
    return res.status(404).send({
      status: 'error',
      error: 'This route is unavailable on this server'
    });
  }); // eslint-disable-next-line no-unused-vars

  app.use(function (error, req, res, next) {
    // don't print stack traces in production environment
    // eslint-disable-next-line no-console
    if (app.get('env') !== 'production') console.log(error.stack);
    res.status(error.status || 500);
    res.send({
      status: 'error',
      error: 'Internal Server Error'
    });
  });
};

exports["default"] = _default;