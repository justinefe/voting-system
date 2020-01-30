"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _sendResponse = require("../utils/sendResponse");

var _validator = require("../modules/validator");

var _CandidateRepository = _interopRequireDefault(require("../repositories/CandidateRepository"));

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

var _PartyRepository = _interopRequireDefault(require("../repositories/PartyRepository"));

var _UserPartyRepository = _interopRequireDefault(require("../repositories/UserPartyRepository"));

/* eslint-disable camelcase */

/* eslint-disable class-methods-use-this */
// import PartyRepository from '../repositories/PartyRepository';
// import UserPartyRepository from '../repositories/UserPartyRepository';

/**
 * Ezekiel 21:27
 * @module AdminController
 * @description Controls admin based activities
 */
var AdminController =
/*#__PURE__*/
function () {
  function AdminController() {
    (0, _classCallCheck2["default"])(this, AdminController);
  }

  (0, _createClass2["default"])(AdminController, [{
    key: "assignRole",

    /**
     * @description Assign roles to users
     *
     * @param {*} req - Request Object
     *
     * @param {*} res - Response Object
     *
     * @returns {object} - returns a response object
     *
     * @memberof AdminController
     */
    value: function () {
      var _assignRole = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, role, roles, updatedUser;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, email = _req$body.email, role = _req$body.role;
                _context.prev = 1;

                if ((0, _validator.inValidEmail)(email)) {
                  _context.next = 14;
                  break;
                }

                _context.next = 5;
                return _UserRepository["default"].getRoles();

              case 5:
                roles = _context.sent;

                if (roles.includes(role)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, "".concat(role, " role does not exist")));

              case 8:
                _context.next = 10;
                return _UserRepository["default"].setRole(email, role);

              case 10:
                updatedUser = _context.sent;

                if (updatedUser) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, "User with email ".concat(email, " not found")));

              case 13:
                return _context.abrupt("return", (0, _sendResponse.successResponse)(res, 200, "New role assigned to ".concat(email)));

              case 14:
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](1);
                throw new Error(_context.t0);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 16]]);
      }));

      function assignRole(_x, _x2) {
        return _assignRole.apply(this, arguments);
      }

      return assignRole;
    }()
    /**
     * @description gets a list of all users
     *
     * @param {object} req - request object
     *
     * @param {object} res - response object
     *
     * @returns {object} returns a response object
     *
     * @memberof AdminController
     */

  }, {
    key: "getUsers",
    value: function () {
      var _getUsers = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var users, usersInfo;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _UserRepository["default"].getAll();

              case 2:
                users = _context2.sent;

                if (users) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, 'No user found'));

              case 5:
                usersInfo = users.map(function (user) {
                  var userInfo = {
                    name: user.name,
                    email: user.email,
                    is_verified: user.is_verified,
                    role: user.role
                  };
                  return userInfo;
                });
                return _context2.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, usersInfo));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getUsers(_x3, _x4) {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }()
    /**
     * @description gets a user by uuid
     *
     * @param {object} req request object
     *
     * @param {object} res response object
     *
     * @returns {object} returns a response containing the user object
     *
     * @memberof AdminController
     */

  }, {
    key: "getUser",
    value: function () {
      var _getUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var email, user, userInfo;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                email = req.params.email;
                _context3.next = 3;
                return _UserRepository["default"].getOne({
                  email: email
                });

              case 3:
                user = _context3.sent;

                if (user) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, 'User not found'));

              case 6:
                userInfo = {
                  name: user.name,
                  email: user.email,
                  is_verified: user.is_verified,
                  role: user.role
                };
                return _context3.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, userInfo));

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getUser(_x5, _x6) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
    /**
     * @description assigns permissions to role
     *
     * @param {object} req request object
     *
     * @param {object} res response object
     *
     * @returns {object} returns a response containing the user object
     *
     * @memberof AdminController
     */

  }, {
    key: "assignPermission",
    value: function () {
      var _assignPermission = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var _req$body2, role, permission, roles, permissions;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _req$body2 = req.body, role = _req$body2.role, permission = _req$body2.permission;
                _context4.prev = 1;
                _context4.next = 4;
                return _UserRepository["default"].getRoles();

              case 4:
                roles = _context4.sent;
                _context4.next = 7;
                return _UserRepository["default"].getPermissions();

              case 7:
                permissions = _context4.sent;

                if (permissions.includes(permission)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, "".concat(permission, " permission does not exist")));

              case 10:
                if (roles.includes(role)) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, "".concat(role, " role does not exist")));

              case 12:
                _context4.next = 14;
                return _UserRepository["default"].setPermission(role, permission);

              case 14:
                return _context4.abrupt("return", (0, _sendResponse.successResponse)(res, 200, "".concat(permission, " permission assigned to ").concat(role, " successfully")));

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 500, 'Unable to assign permission'));

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 17]]);
      }));

      function assignPermission(_x7, _x8) {
        return _assignPermission.apply(this, arguments);
      }

      return assignPermission;
    }()
    /**
     * @description assigns permissions to role
     *
     * @param {object} req request object
     *
     * @param {object} res response object
     *
     * @param {object} next passes control to the  next middleware
     *
     * @returns {object} returns a response containing the user object
     * 
     * @memberof AdminController
     */

  }, {
    key: "approveVoterParty",
    value: function () {
      var _approveVoterParty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res, next) {
        var uuid, user_uuid, status, checkUser, partyUuid, checkParty, partyAdmin;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                uuid = req.userData.uuid;
                user_uuid = req.params.user_uuid;
                status = req.body.status;
                _context5.prev = 3;
                _context5.next = 6;
                return _UserPartyRepository["default"].getOne({
                  user_uuid: user_uuid
                });

              case 6:
                checkUser = _context5.sent;
                if (!checkUser) (0, _sendResponse.sendErrorResponse)(res, 400, 'User has not made request to join a political party');
                partyUuid = checkUser.party_uuid;
                _context5.next = 11;
                return _PartyRepository["default"].getOne({
                  uuid: partyUuid
                });

              case 11:
                checkParty = _context5.sent;
                partyAdmin = checkParty.admin_uuid;

                if (!(partyAdmin !== uuid)) {
                  _context5.next = 15;
                  break;
                }

                return _context5.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 401, 'Only party administrator can approve party membership'));

              case 15:
                if (!(status === 'accepted')) {
                  _context5.next = 20;
                  break;
                }

                _context5.next = 18;
                return _UserPartyRepository["default"].update({
                  status: status
                }, partyUuid);

              case 18:
                _context5.next = 20;
                return _UserRepository["default"].update({
                  party_uuid: partyUuid
                }, user_uuid);

              case 20:
                return _context5.abrupt("return", (0, _sendResponse.successResponse)(res, 200, "You have succesfully ".concat(status, " a voter request to join party")));

              case 23:
                _context5.prev = 23;
                _context5.t0 = _context5["catch"](3);
                next(_context5.t0);

              case 26:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 23]]);
      }));

      function approveVoterParty(_x9, _x10, _x11) {
        return _approveVoterParty.apply(this, arguments);
      }

      return approveVoterParty;
    }()
    /**
     * @description assigns permissions to role
     *
     * @param {object} req request object
     *
     * @param {object} res response object
     *
     * @param {object} next passes control to the  next middleware
     *
     * @returns {object} returns a response containing the user object
     * 
     * @memberof AdminController
     */

  }, {
    key: "approvePartyAdmin",
    value: function () {
      var _approvePartyAdmin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(req, res, next) {
        var admin_uuid, party_name, checkUser, partyAdmin, party, partyUuid;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // eslint-disable-next-line camelcase
                admin_uuid = req.params.admin_uuid;
                party_name = req.body.partyName;
                _context6.prev = 2;
                _context6.next = 5;
                return _UserRepository["default"].getOne({
                  uuid: admin_uuid
                });

              case 5:
                checkUser = _context6.sent;
                if (!checkUser) (0, _sendResponse.sendErrorResponse)(404, res, 'Admin not  user');
                partyAdmin = checkUser.role;

                if (!(partyAdmin !== 'Party Administrator')) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 401, 'Only Party Adminstrator can be admin for parties'));

              case 10:
                _context6.next = 12;
                return _PartyRepository["default"].getOne({
                  party_name: party_name
                });

              case 12:
                party = _context6.sent;

                if (party) {
                  _context6.next = 15;
                  break;
                }

                return _context6.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, "".concat(party_name, " does not exist")));

              case 15:
                partyUuid = party.uuid;
                _context6.next = 18;
                return _PartyRepository["default"].update({
                  admin_uuid: admin_uuid
                }, partyUuid);

              case 18:
                return _context6.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, "Party admin has been assigned to ".concat(party_name)));

              case 21:
                _context6.prev = 21;
                _context6.t0 = _context6["catch"](2);
                return _context6.abrupt("return", next(_context6.t0));

              case 24:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 21]]);
      }));

      function approvePartyAdmin(_x12, _x13, _x14) {
        return _approvePartyAdmin.apply(this, arguments);
      }

      return approvePartyAdmin;
    }()
    /**
     * @description assigns permissions to role
     *
     * @param {object} req request object
     *
     * @param {object} res response object
     *
     * @param {object} next passes control to the  next middleware
     *
     * @returns {object} returns a response containing the user object
     * 
     * @memberof AdminController
     */

  }, {
    key: "approveParty",
    value: function () {
      var _approveParty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(req, res, next) {
        var party_uuid, status, party;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                party_uuid = req.params.party_uuid;
                status = req.body.status;
                _context7.prev = 2;
                _context7.next = 5;
                return _PartyRepository["default"].getOne({
                  uuid: party_uuid
                });

              case 5:
                party = _context7.sent;
                if (!party) (0, _sendResponse.sendErrorResponse)(res, 404, 'party can not be found');
                _context7.next = 9;
                return _PartyRepository["default"].update({
                  status: status
                }, party_uuid);

              case 9:
                return _context7.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, "Party has been ".concat(status)));

              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7["catch"](2);
                next(_context7.t0);

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 12]]);
      }));

      function approveParty(_x15, _x16, _x17) {
        return _approveParty.apply(this, arguments);
      }

      return approveParty;
    }()
  }]);
  return AdminController;
}();

var _default = new AdminController();

exports["default"] = _default;