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

var _OfficeRepository = _interopRequireDefault(require("../repositories/OfficeRepository"));

var _CandidateRepository = _interopRequireDefault(require("../repositories/CandidateRepository"));

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

var _PartyRepository = _interopRequireDefault(require("../repositories/PartyRepository"));

var _VoteRepository = _interopRequireDefault(require("../repositories/VoteRepository"));

/* eslint-disable class-methods-use-this */

/**
 * Ezekiel 21:27
 * @module AdminController
 * @description Controls admin based activities
 */
var CandidateController =
/*#__PURE__*/
function () {
  function CandidateController() {
    (0, _classCallCheck2["default"])(this, CandidateController);
  }

  (0, _createClass2["default"])(CandidateController, [{
    key: "updateCandidate",

    /**
     * @description Assign roles to users
     *
     * @param {*} req - Request Object
     *
     * @param {*} res - Response Object
     * 
     * @param {next} next - passes control to the middlewware
     *
     * @returns {object} - returns a response object
     *
     * @memberof AdminController
     */
    value: function () {
      var _updateCandidate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                try {} catch (error) {
                  next(error);
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function updateCandidate(_x, _x2, _x3) {
        return _updateCandidate.apply(this, arguments);
      }

      return updateCandidate;
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
    key: "approveCandidacy",
    value: function () {
      var _approveCandidacy = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res, next) {
        var uuid, candidacyUuid, _req$body, status, office_contesting, checkUser, userId, checkParty, partyUuid, checkCandidate, user_uuid, checkForApprovedCandidate;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                uuid = req.userData.uuid;
                candidacyUuid = req.params.candidate_uuid;
                _req$body = req.body, status = _req$body.status, office_contesting = _req$body.officeContesting;
                _context2.prev = 3;
                _context2.next = 6;
                return _UserRepository["default"].getOne({
                  uuid: uuid
                });

              case 6:
                checkUser = _context2.sent;
                userId = checkUser.uuid;
                _context2.next = 10;
                return _PartyRepository["default"].getOne({
                  admin_uuid: userId,
                  status: 'accepted'
                });

              case 10:
                checkParty = _context2.sent;

                if (checkParty) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, 'The intended party does not exist or wasn\'t eligible'));

              case 13:
                partyUuid = checkParty.uuid;
                _context2.next = 16;
                return _CandidateRepository["default"].getOne({
                  uuid: candidacyUuid,
                  party_uuid: partyUuid
                });

              case 16:
                checkCandidate = _context2.sent;

                if (checkCandidate) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, 'Only a political party\'s admin can approve a parties candidate'));

              case 19:
                user_uuid = checkCandidate.user_uuid;
                _context2.next = 22;
                return _CandidateRepository["default"].findAccepted({
                  party_uuid: partyUuid,
                  status: 'Accepted',
                  officeContesting: office_contesting
                });

              case 22:
                checkForApprovedCandidate = _context2.sent;

                if (!(checkForApprovedCandidate == null)) {
                  _context2.next = 25;
                  break;
                }

                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, 'A candidate has already been approved for same positon'));

              case 25:
                if (!(status === 'accepted')) {
                  _context2.next = 30;
                  break;
                }

                _context2.next = 28;
                return _CandidateRepository["default"].update({
                  status: status
                }, candidacyUuid);

              case 28:
                _context2.next = 30;
                return _UserRepository["default"].update({
                  role: 'Candidate'
                }, user_uuid);

              case 30:
                return _context2.abrupt("return", (0, _sendResponse.successResponse)(res, 200, "You have succesfully ".concat(status, " candidacy")));

              case 33:
                _context2.prev = 33;
                _context2.t0 = _context2["catch"](3);
                next(_context2.t0);

              case 36:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 33]]);
      }));

      function approveCandidacy(_x4, _x5, _x6) {
        return _approveCandidacy.apply(this, arguments);
      }

      return approveCandidacy;
    }()
    /**
     * @description Assign roles to users
     *
     * @param {*} req - Request Object
     *
     * @param {*} res - Response Object
     * 
     * @param {next} next - passes control to the middlewware
     *
     * @returns {object} - returns a response object
     *
     * @memberof AdminController
     */

  }, {
    key: "viewACandidate",
    value: function () {
      var _viewACandidate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res, next) {
        var candidateUuid, checkCandidate, firstName, lastName, candidate, userInfo;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                candidateUuid = req.params.candidateUuid;
                _context3.prev = 1;
                _context3.next = 4;
                return _UserRepository["default"].findOne({
                  uuid: candidateUuid
                });

              case 4:
                checkCandidate = _context3.sent;

                if (checkCandidate) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, 'Candidate not found'));

              case 7:
                firstName = checkCandidate.first_name, lastName = checkCandidate.last_name, candidate = checkCandidate.candidate;
                userInfo = {
                  firstName: firstName,
                  lastName: lastName,
                  office_contesting: candidate[0].officeContesting
                };
                return _context3.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, userInfo));

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](1);
                next(_context3.t0);

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 12]]);
      }));

      function viewACandidate(_x7, _x8, _x9) {
        return _viewACandidate.apply(this, arguments);
      }

      return viewACandidate;
    }()
    /**
     * @description Assign roles to users
     *
     * @param {*} req - Request Object
     *
     * @param {*} res - Response Object
     * 
     * @param {next} next - passes control to the middlewware
     *
     * @returns {object} - returns a response object
     *
     * @memberof AdminController
     */

  }, {
    key: "viewAllCandidate",
    value: function () {
      var _viewAllCandidate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res, next) {
        var checkCandidate, candidates;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _CandidateRepository["default"].findAll();

              case 3:
                checkCandidate = _context4.sent;

                if (checkCandidate) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, 'Candidates not found'));

              case 6:
                candidates = checkCandidate.map(function (candidate) {
                  var dataValues = candidate.dataValues;
                  var officeContesting = dataValues.officeContesting,
                      user = dataValues.user;
                  var newUser = user.dataValues;
                  var firstName = newUser.first_name,
                      lastName = newUser.last_name;
                  return {
                    firstName: firstName,
                    lastName: lastName,
                    officeContesting: officeContesting
                  };
                });
                return _context4.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, candidates));

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](0);
                next(_context4.t0);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 10]]);
      }));

      function viewAllCandidate(_x10, _x11, _x12) {
        return _viewAllCandidate.apply(this, arguments);
      }

      return viewAllCandidate;
    }()
    /**
     * @description Assign roles to users
     *
     * @param {*} req - Request Object
     *
     * @param {*} res - Response Object
     * 
     * @param {next} next - passes control to the middlewware
     *
     * @returns {object} - returns a response object
     *
     * @memberof AdminController
     */

  }, {
    key: "deleteACandidate",
    value: function () {
      var _deleteACandidate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res, next) {
        var candidateUuid, uuid, checkPartyAdmin, adminUuid;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                candidateUuid = req.params.candidateUuid;
                uuid = req.userData.uuid;
                _context5.prev = 2;
                _context5.next = 5;
                return _PartyRepository["default"].findOne({
                  uuid: candidateUuid
                });

              case 5:
                checkPartyAdmin = _context5.sent;

                if (checkPartyAdmin) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, 'Candidate does\'t exist'));

              case 8:
                adminUuid = checkPartyAdmin.admin_uuid;

                if (!(uuid !== adminUuid)) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 401, 'You are not eligible to delete this candidate'));

              case 11:
                _context5.next = 13;
                return _CandidateRepository["default"].deleteOne({
                  uuid: candidateUuid
                });

              case 13:
                return _context5.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, 'You have succesfully deleted candidate'));

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](2);
                next(_context5.t0);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 16]]);
      }));

      function deleteACandidate(_x13, _x14, _x15) {
        return _deleteACandidate.apply(this, arguments);
      }

      return deleteACandidate;
    }()
  }]);
  return CandidateController;
}();

var _default = new CandidateController();

exports["default"] = _default;