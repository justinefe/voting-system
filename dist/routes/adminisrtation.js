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

var _AdminController = _interopRequireDefault(require("../controllers/AdminController"));

var adminRouter = (0, _express.Router)();
adminRouter.patch('/party/:party_uuid/status', _AuthenticateUser["default"], _VerifyRoles["default"].verifyELectionAdmin, _RequestValidator["default"].partyAdminValidation, _AdminController["default"].approveParty);
adminRouter.patch('/user/:user_uuid/status', _AuthenticateUser["default"], _VerifyRoles["default"].verifyPartyAdmin, _RequestValidator["default"].approvePartyValidation, _AdminController["default"].approveVoterParty);
adminRouter.patch('/admin/:admin_uuid/status', _AuthenticateUser["default"], _VerifyRoles["default"].verifyELectionAdmin, _RequestValidator["default"].voterJoinValidation, _AdminController["default"].approvePartyAdmin);
var _default = adminRouter;
exports["default"] = _default;