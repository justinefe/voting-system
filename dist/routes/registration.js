"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _AuthenticateUser = _interopRequireDefault(require("../middlewares/AuthenticateUser"));

var _VerifyRoles = _interopRequireDefault(require("../middlewares/VerifyRoles"));

var _RequestValidator = _interopRequireDefault(require("../middlewares/RequestValidator"));

var _RegistrationController = _interopRequireDefault(require("../controllers/RegistrationController"));

var registrationRouter = (0, _express.Router)();
registrationRouter.put('/register_voter', _AuthenticateUser["default"], _VerifyRoles["default"].verifyVoter, _RequestValidator["default"].voterValidation, _RegistrationController["default"].voterRegistration);
registrationRouter.post('/register_party', _AuthenticateUser["default"], _VerifyRoles["default"].verifyVoter, _RequestValidator["default"].partyValidation, _RegistrationController["default"].partyRegistration);
registrationRouter.post('/register_candidate', _AuthenticateUser["default"], _VerifyRoles["default"].verifyVoter, _RequestValidator["default"].candidateValidation, _RegistrationController["default"].candidateRegistration);
registrationRouter.post('/join_party', _AuthenticateUser["default"], _VerifyRoles["default"].verifyVoter, _RequestValidator["default"].voterJoinValidation, _RegistrationController["default"].voterJoinParty);
registrationRouter.post('/register_office', _AuthenticateUser["default"], _VerifyRoles["default"].verifyELectionAdmin, _RequestValidator["default"].officeValidation, _RegistrationController["default"].createOffice);
var _default = registrationRouter;
exports["default"] = _default;