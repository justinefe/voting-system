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

var _PartyRepository = _interopRequireDefault(require("../repositories/PartyRepository"));

var _CandidateRepository = _interopRequireDefault(require("../repositories/CandidateRepository"));

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

var _OfficeRepository = _interopRequireDefault(require("../repositories/OfficeRepository"));

var _UserPartyRepository = _interopRequireDefault(require("../repositories/UserPartyRepository"));

var _sendResponse = require("../utils/sendResponse");

/* eslint-disable camelcase */

/* eslint-disable class-methods-use-this */

/**
 * @module registration controller
 * 
 * @description Voter controller is a module that handles the control of voter registeration
 * 
 * @returns {object} returns a response containing the user object
 * 
 * @memberof RegistrationController
 */
var RegistrationController =
/*#__PURE__*/
function () {
  function RegistrationController() {
    (0, _classCallCheck2["default"])(this, RegistrationController);
  }

  (0, _createClass2["default"])(RegistrationController, [{
    key: "voterRegistration",

    /**
      * @description manages the registrations of voters
      * 
      * @param {*} req - the request body method
      * 
      * @param {*} res - the response body method
      * 
      */
    value: function () {
      var _voterRegistration = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        var uuid, checkRequest, voterState, _req$body, country, state, gender, city, residential_address, date_of_birth;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                uuid = req.userData.uuid;
                _context.prev = 1;
                _context.next = 4;
                return _UserRepository["default"].getOne({
                  uuid: uuid
                });

              case 4:
                checkRequest = _context.sent;
                voterState = checkRequest.state;
                if (voterState) (0, _sendResponse.sendErrorResponse)(res, 400, 'Voter registeration has been done');
                _req$body = req.body, country = _req$body.country, state = _req$body.state, gender = _req$body.gender, city = _req$body.city, residential_address = _req$body.residentialAddress, date_of_birth = _req$body.dateOfBirth;
                _context.next = 10;
                return _UserRepository["default"].update({
                  country: country,
                  state: state,
                  city: city,
                  gender: gender,
                  residential_address: residential_address,
                  date_of_birth: date_of_birth
                }, uuid);

              case 10:
                return _context.abrupt("return", (0, _sendResponse.successResponse)(res, 200, 'Your voters registration done succesfully'));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);
                next(_context.t0);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 13]]);
      }));

      function voterRegistration(_x, _x2, _x3) {
        return _voterRegistration.apply(this, arguments);
      }

      return voterRegistration;
    }()
    /** 
     * @description manages the registrations of party
     * 
     * @param {req} req- the request body method
     * 
     * @param {res} res- the response body method
     * 
     * @param {return} returns the succes message
     * 
     * @param {next} next- passes command to the next middleware
     * 
     */

  }, {
    key: "candidateRegistration",
    value: function () {
      var _candidateRegistration = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res, next) {
        var _req$body2, officeContesting, partyName, uuid, checkParty, politicalParty, checkOffice, officeUuid, candidate, candidateInfo;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, officeContesting = _req$body2.officeContesting, partyName = _req$body2.partyName;
                uuid = req.userData.uuid;
                _context2.prev = 2;
                _context2.next = 5;
                return _PartyRepository["default"].getOne({
                  party_name: partyName
                });

              case 5:
                checkParty = _context2.sent;

                if (checkParty) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 409, "Party ".concat(partyName, " does not exists")));

              case 8:
                politicalParty = checkParty.uuid;
                _context2.next = 11;
                return _OfficeRepository["default"].getOne({
                  name: officeContesting
                });

              case 11:
                checkOffice = _context2.sent;

                if (checkOffice) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, "".concat(officeContesting, " can not be found")));

              case 14:
                officeUuid = checkOffice.uuid;
                _context2.next = 17;
                return _UserRepository["default"].getOne({
                  uuid: uuid,
                  party_uuid: politicalParty
                });

              case 17:
                candidate = _context2.sent;

                if (candidate) {
                  _context2.next = 20;
                  break;
                }

                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, "You are not eligible to contest with ".concat(partyName, " as only party members can")));

              case 20:
                candidateInfo = {
                  officeContesting: officeContesting,
                  party_uuid: politicalParty,
                  user_uuid: uuid,
                  office_uuid: officeUuid
                };
                _context2.next = 23;
                return _CandidateRepository["default"].create(candidateInfo);

              case 23:
                return _context2.abrupt("return", (0, _sendResponse.successResponse)(res, 201, "Your registration to contest ".concat(officeContesting, " with ").concat(partyName, " succesful")));

              case 26:
                _context2.prev = 26;
                _context2.t0 = _context2["catch"](2);
                next(_context2.t0);

              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 26]]);
      }));

      function candidateRegistration(_x4, _x5, _x6) {
        return _candidateRegistration.apply(this, arguments);
      }

      return candidateRegistration;
    }()
    /**
    * @description registers political parties
    * 
    * @param {method} req - request body object
    * 
    * @param  {method} res - response body object
    * 
    * @param  {method} next- passes command to next middleware
    * 
    * @returns returns the value of the function
    * 
    *  @memberof RegistrationController
    * 
    */

  }, {
    key: "partyRegistration",
    value: function () {
      var _partyRegistration = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res, next) {
        var _req$body3, party_name, phone_number, address, party, partyInfo;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _req$body3 = req.body, party_name = _req$body3.partyName, phone_number = _req$body3.phoneNumber, address = _req$body3.partyAddress;
                _context3.prev = 1;
                _context3.next = 4;
                return _PartyRepository["default"].getOne({
                  party_name: party_name
                });

              case 4:
                party = _context3.sent;

                if (!party) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 409, "Party ".concat(party_name, " already exists")));

              case 7:
                partyInfo = {
                  party_name: party_name,
                  phone_number: phone_number,
                  address: address
                };
                _context3.next = 10;
                return _PartyRepository["default"].create(partyInfo);

              case 10:
                return _context3.abrupt("return", (0, _sendResponse.successResponse)(res, 201, "Party ".concat(party_name, " creation submitted succesfully")));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](1);
                next(_context3.t0);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 13]]);
      }));

      function partyRegistration(_x7, _x8, _x9) {
        return _partyRegistration.apply(this, arguments);
      }

      return partyRegistration;
    }()
    /**
     * @description registers political parties
     * 
     * @param {method} req - request body object
     * 
     * @param  {method} res - response body object
     * 
     * @param  {method} next- passes command to next middleware
     * 
     * @returns returns the value of the function
     */

  }, {
    key: "voterJoinParty",
    value: function () {
      var _voterJoinParty = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res, next) {
        var party_name, uuid, checkParty, party_uuid, checkRequest;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                party_name = req.body.partyName;
                uuid = req.userData.uuid;
                _context4.prev = 2;
                _context4.next = 5;
                return _PartyRepository["default"].getOne({
                  party_name: party_name,
                  status: 'accepted'
                });

              case 5:
                checkParty = _context4.sent;

                if (checkParty) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, "Party ".concat(party_name, " does not exists")));

              case 8:
                party_uuid = checkParty.uuid;
                _context4.next = 11;
                return _UserPartyRepository["default"].getOne({
                  user_uuid: uuid,
                  party_uuid: party_uuid
                });

              case 11:
                checkRequest = _context4.sent;
                if (checkRequest) (0, _sendResponse.sendErrorResponse)(res, 400, 'Request has been previously made');
                _context4.next = 15;
                return _UserPartyRepository["default"].createOne({
                  party_uuid: party_uuid,
                  user_uuid: uuid
                });

              case 15:
                return _context4.abrupt("return", (0, _sendResponse.successResponse)(res, 200, "Your request to join ".concat(party_name, " succesfully")));

              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4["catch"](2);
                next(_context4.t0);

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 18]]);
      }));

      function voterJoinParty(_x10, _x11, _x12) {
        return _voterJoinParty.apply(this, arguments);
      }

      return voterJoinParty;
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
    key: "createOffice",
    value: function () {
      var _createOffice = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res, next) {
        var officeName, checkOffice;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                officeName = req.body.officeName;
                _context5.prev = 1;
                _context5.next = 4;
                return _OfficeRepository["default"].getOne({
                  name: officeName
                });

              case 4:
                checkOffice = _context5.sent;

                if (!checkOffice) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, "".concat(officeName, " Office already existed")));

              case 7:
                _context5.next = 9;
                return _OfficeRepository["default"].create({
                  name: officeName
                });

              case 9:
                return _context5.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 201, "".concat(officeName, " created succesfully")));

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](1);
                next(_context5.t0);

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 12]]);
      }));

      function createOffice(_x13, _x14, _x15) {
        return _createOffice.apply(this, arguments);
      }

      return createOffice;
    }()
  }]);
  return RegistrationController;
}();

var _default = new RegistrationController();

exports["default"] = _default;