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

var _VoteController = _interopRequireDefault(require("../controllers/VoteController"));

var voteRouter = (0, _express.Router)();
voteRouter.post('/voter/:candidateUuid', _AuthenticateUser["default"], _VerifyRoles["default"].verifyVoter, _VoteController["default"].voteACandidate);
voteRouter.post('/vote/start', _AuthenticateUser["default"], _VerifyRoles["default"].verifyELectionAdmin, _VoteController["default"].startVote);
voteRouter.get('/vote/end', _AuthenticateUser["default"], _VerifyRoles["default"].verifyELectionAdmin, _VoteController["default"].endVote);
var _default = voteRouter;
exports["default"] = _default;