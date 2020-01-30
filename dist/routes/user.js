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

var _UserAuth = _interopRequireDefault(require("../middlewares/UserAuth"));

var _AuthenticateUser = _interopRequireDefault(require("../middlewares/AuthenticateUser"));

var _VerifyRoles = _interopRequireDefault(require("../middlewares/VerifyRoles"));

/* eslint-disable linebreak-style */
var userRouter = (0, _express.Router)();
userRouter.post('/auth/signup', _UserAuth["default"].signup, _AuthController["default"].signup);
/*
userRouter.get('/user', authenticateUser, AuthController.show);
userRouter.put('/user', authenticateUser, AuthController.update);
*/

userRouter.get('/oauth/google', _passport["default"].authenticate('google', {
  session: false
}), _AuthController["default"].social);
userRouter.get('/oauth/facebook', _passport["default"].authenticate('facebook', {
  session: false
}), _AuthController["default"].social);
userRouter.get('/auth/confirm_email', _AuthController["default"].confirmEmail);
userRouter.post('/auth/signin', _UserAuth["default"].signin, _AuthController["default"].signin);
userRouter.get('/auth/signout', _AuthenticateUser["default"], _AuthController["default"].signout);
userRouter.post('/auth/forgot_password', _AuthController["default"].sendResetLink);
userRouter.put('/auth/reset_password/:uuid/:token', _AuthController["default"].resetPassword);
userRouter.get('/users', _AuthenticateUser["default"], _VerifyRoles["default"].verifySupAdmin, _AdminController["default"].getUsers);
userRouter.get('/users/:email', _AuthenticateUser["default"], _VerifyRoles["default"].verifySupAdmin, _AdminController["default"].getUser);
userRouter.put('/admin/assign_role', _AuthenticateUser["default"], _VerifyRoles["default"].verifySupAdmin, _AdminController["default"].assignRole);
userRouter.put('/admin/assign_permission', _AuthenticateUser["default"], _VerifyRoles["default"].verifySupAdmin, _AdminController["default"].assignPermission);
var _default = userRouter;
exports["default"] = _default;