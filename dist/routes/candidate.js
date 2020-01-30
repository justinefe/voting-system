"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _AuthenticateUser = _interopRequireDefault(require("../middlewares/AuthenticateUser"));

var _VerifyRoles = _interopRequireDefault(require("../middlewares/VerifyRoles"));

var _CandidateController = _interopRequireDefault(require("../controllers/CandidateController"));

var _RequestValidator = _interopRequireDefault(require("../middlewares/RequestValidator"));

var candidateRouter = (0, _express.Router)();
candidateRouter.get('/candidate/:candidateUuid', _AuthenticateUser["default"], _VerifyRoles["default"].verifyRequester, _CandidateController["default"].viewACandidate);
candidateRouter.get('/candidate', _AuthenticateUser["default"], _VerifyRoles["default"].verifyRequester, _CandidateController["default"].viewAllCandidate);
candidateRouter["delete"]('/candidate/:candidateUuid', _AuthenticateUser["default"], _VerifyRoles["default"].verifyELectionAdmin, _CandidateController["default"].deleteACandidate);
candidateRouter.patch('/candidate/:candidate_uuid/status', _AuthenticateUser["default"], _VerifyRoles["default"].verifyPartyAdmin, _RequestValidator["default"].approveCandidacyValidation, _CandidateController["default"].approveCandidacy);
var _default = candidateRouter;
exports["default"] = _default;