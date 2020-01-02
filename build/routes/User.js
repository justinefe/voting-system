"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _AuthController = _interopRequireDefault(require("../controllers/AuthController"));

var _AdminController = _interopRequireDefault(require("../controllers/AdminController"));

var _userAuth = _interopRequireDefault(require("../middlewares/userAuth"));

var _authenticateUser = _interopRequireDefault(require("../middlewares/authenticateUser"));

var _verifyRoles = _interopRequireDefault(require("../middlewares/verifyRoles"));

/* eslint-disable linebreak-style */
var userRouter = (0, _express.Router)();
userRouter.post('/auth/signup', _userAuth["default"].signup, _AuthController["default"].signup);
userRouter.get('/user', _authenticateUser["default"], _AuthController["default"].show);
userRouter.put('/user', _authenticateUser["default"], _AuthController["default"].update);
userRouter.get('/oauth/google', _passport["default"].authenticate('google', {
  session: false
}), _AuthController["default"].social);
userRouter.get('/oauth/facebook', _passport["default"].authenticate('facebook', {
  session: false
}), _AuthController["default"].social);
userRouter.get('/auth/confirm_email', _AuthController["default"].confirmEmail);
userRouter.post('/auth/signin', _userAuth["default"].signin, _AuthController["default"].signin);
userRouter.get('/auth/signout', _authenticateUser["default"], _AuthController["default"].signout);
userRouter.post('/auth/forgot_password', _AuthController["default"].sendResetLink);
userRouter.put('/auth/reset_password/:uuid/:token', _AuthController["default"].resetPassword);
userRouter.get('/users', _authenticateUser["default"], _verifyRoles["default"].verifySupAdmin, _AdminController["default"].getUsers);
userRouter.get('/users/:email', _authenticateUser["default"], _verifyRoles["default"].verifySupAdmin, _AdminController["default"].getUser);
userRouter.put('/admin/assign_role', _authenticateUser["default"], _verifyRoles["default"].verifySupAdmin, _AdminController["default"].assignRole);
userRouter.put('/admin/assign_permission', _authenticateUser["default"], _verifyRoles["default"].verifySupAdmin, _AdminController["default"].assignPermission);
var _default = userRouter;
exports["default"] = _default;