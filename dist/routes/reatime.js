"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _AuthenticateUser = _interopRequireDefault(require("../middlewares/AuthenticateUser"));

var _VerifyRoles = _interopRequireDefault(require("../middlewares/VerifyRoles"));

var _realTimeController = _interopRequireDefault(require("../controllers/realTimeController"));

// import requestValidator from '../middlewares/RequestValidator';
var realtimeRouter = (0, _express.Router)();
realtimeRouter.post('/chat', _AuthenticateUser["default"], _VerifyRoles["default"].verifyRequester, _realTimeController["default"].addChat);
var _default = realtimeRouter;
exports["default"] = _default;