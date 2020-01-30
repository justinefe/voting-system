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

var _moment = _interopRequireDefault(require("moment"));

var _fs = require("fs");

var _sendResponse = require("../utils/sendResponse");

var _OfficeRepository = _interopRequireDefault(require("../repositories/OfficeRepository"));

var _CandidateRepository = _interopRequireDefault(require("../repositories/CandidateRepository"));

var _VoteRepository = _interopRequireDefault(require("../repositories/VoteRepository"));

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

var _ResultRepository = _interopRequireDefault(require("../repositories/ResultRepository"));

var _utils = require("../utils");

/* eslint-disable class-methods-use-this */

/**
 * Ezekiel 21:27
 * @module AdminController
 * @description Controls admin based activities
 */
var VoteController =
/*#__PURE__*/
function () {
  function VoteController() {
    (0, _classCallCheck2["default"])(this, VoteController);
  }

  (0, _createClass2["default"])(VoteController, [{
    key: "voteACandidate",

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
      var _voteACandidate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        var candidateUuid, userUuid, checkCandidate, name, voted;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                candidateUuid = req.params.candidateUuid;
                userUuid = req.userData.uuid;
                _context.prev = 2;
                _context.next = 5;
                return _OfficeRepository["default"].findOne({
                  uuid: candidateUuid
                });

              case 5:
                checkCandidate = _context.sent;

                if (checkCandidate) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, 'Candidate does\'t exist or not eligible to contest'));

              case 8:
                name = checkCandidate.name;
                _context.next = 11;
                return _UserRepository["default"].checkVote(userUuid, name);

              case 11:
                voted = _context.sent;
                if (voted === true) (0, _sendResponse.sendErrorResponse)(res, 400, 'You can only vote once');
                _context.next = 15;
                return _VoteRepository["default"].Vote({
                  candidate_uuid: candidateUuid
                });

              case 15:
                return _context.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 201, 'You have succesfully voted candidate'));

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](2);
                next(_context.t0);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 18]]);
      }));

      function voteACandidate(_x, _x2, _x3) {
        return _voteACandidate.apply(this, arguments);
      }

      return voteACandidate;
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
    key: "startVote",
    value: function () {
      var _startVote = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res, next) {
        var checkCandidate, candidates, eligibleCandidates;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _VoteRepository["default"].destroyAll();

              case 3:
                _context2.next = 5;
                return _CandidateRepository["default"].findAllCandidate();

              case 5:
                checkCandidate = _context2.sent;

                if (checkCandidate) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, 'Candidates not found'));

              case 8:
                candidates = checkCandidate.map(function (candidate) {
                  var dataValues = candidate.dataValues;
                  var candidate_uuid = dataValues.uuid,
                      status = dataValues.status,
                      office_uuid = dataValues.office_uuid;
                  return {
                    vote: 0,
                    candidate_uuid: candidate_uuid,
                    office_uuid: office_uuid,
                    status: status
                  };
                });
                eligibleCandidates = candidates.filter(function (candidate) {
                  return candidate.status === 'accepted';
                });
                _context2.next = 12;
                return _VoteRepository["default"].CreateAll(eligibleCandidates);

              case 12:
                return _context2.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 201, 'You have succesfully started the election candidate'));

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);
                next(_context2.t0);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 15]]);
      }));

      function startVote(_x4, _x5, _x6) {
        return _startVote.apply(this, arguments);
      }

      return startVote;
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
    key: "endVote",
    value: function () {
      var _endVote = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res, next) {
        var date, checkOffice, candidates, checkVote, getData;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                date = req.body.date; // const dateNow = moment(date);
                // const stopageTime = getStopageTime(dateNow);

                _context5.prev = 1;
                _context5.next = 4;
                return _OfficeRepository["default"].findAllOffice();

              case 4:
                checkOffice = _context5.sent;
                candidates = checkOffice.map(function (candidate) {
                  var dataValues = candidate.dataValues;
                  var officeUuid = dataValues.uuid;
                  return officeUuid;
                });
                checkVote = candidates.map(
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee3(office) {
                    var result, total_votes, _ref2, dataValues, votes, candidate, officeContesting, user, firstName, lastName;

                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _VoteRepository["default"].findMaxmum({
                              office_uuid: office
                            });

                          case 2:
                            result = _context3.sent;
                            _context3.next = 5;
                            return _VoteRepository["default"].findSum({
                              office_uuid: office
                            });

                          case 5:
                            total_votes = _context3.sent;

                            if (isNaN(result)) {
                              _context3.next = 15;
                              break;
                            }

                            _context3.next = 9;
                            return _VoteRepository["default"].getOneAll({
                              votes: result,
                              office_uuid: office
                            });

                          case 9:
                            _ref2 = _context3.sent;
                            dataValues = _ref2.dataValues;
                            votes = dataValues.votes, candidate = dataValues.candidate;
                            officeContesting = candidate.officeContesting, user = candidate.user;
                            firstName = user.first_name, lastName = user.last_name;
                            return _context3.abrupt("return", {
                              name: "".concat(firstName, " ").concat(lastName),
                              votes: votes,
                              total_votes: total_votes,
                              OfficeContested: officeContesting,
                              election_name: 'National Election'
                            });

                          case 15:
                            return _context3.abrupt("return", result);

                          case 16:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x10) {
                    return _ref.apply(this, arguments);
                  };
                }());

                getData =
                /*#__PURE__*/
                function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee4() {
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            return _context4.abrupt("return", Promise.all(checkVote));

                          case 1:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function getData() {
                    return _ref3.apply(this, arguments);
                  };
                }();

                getData().then(function (data) {
                  var newData = data.filter(function (arr) {
                    if (isNaN(arr) === true) return arr;
                  });
                  newData.length > 1 ? _ResultRepository["default"].CreateAll(newData).then(function (result) {
                    return console.log(result);
                  }) : _ResultRepository["default"].CreateOne(newData).then(function (result) {
                    return console.log(result);
                  });
                  return (0, _sendResponse.sendSuccessResponse)(res, 400, newData);
                });
                _context5.next = 14;
                break;

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](1);
                next(_context5.t0);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 11]]);
      }));

      function endVote(_x7, _x8, _x9) {
        return _endVote.apply(this, arguments);
      }

      return endVote;
    }()
  }]);
  return VoteController;
}();

var _default = new VoteController();

exports["default"] = _default;