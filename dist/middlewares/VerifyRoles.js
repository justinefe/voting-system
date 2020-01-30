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

var _tokenProcessor = require("../modules/tokenProcessor");

var _sendResponse = require("../utils/sendResponse");

/* eslint-disable class-methods-use-this */

/**
 * @module VerifyRoles
 */
var VerifyRoles =
/*#__PURE__*/
function () {
  function VerifyRoles() {
    (0, _classCallCheck2["default"])(this, VerifyRoles);
  }

  (0, _createClass2["default"])(VerifyRoles, [{
    key: "verifySupAdmin",

    /**
     * @description verify and authorize Super Administrator roles
     * 
     * @param {*} req
     * 
     * @param {*} res
     * 
     * @param {*} next
     * 
     * @returns {*} pass control to the next middleware
     */
    value: function () {
      var _verifySupAdmin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        var token, userDetail;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
                _context.next = 3;
                return (0, _tokenProcessor.verifyToken)(token);

              case 3:
                userDetail = _context.sent;
                req.userData = userDetail;

                if (!(req.userData.role !== 'Super Administrator')) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 401, 'Unauthorized access'));

              case 7:
                next();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function verifySupAdmin(_x, _x2, _x3) {
        return _verifySupAdmin.apply(this, arguments);
      }

      return verifySupAdmin;
    }()
    /**
     * @description verify and authorize Requester roles
     * 
     * @param {*} req
     * 
     * @param {*} res
     * 
     * @param {*} next
     * 
     * @returns {*} pass control to the next middleware
     */

  }, {
    key: "verifyRequester",
    value: function () {
      var _verifyRequester = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res, next) {
        var token, userDetail;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
                _context2.next = 3;
                return (0, _tokenProcessor.verifyToken)(token);

              case 3:
                userDetail = _context2.sent;
                req.userData = userDetail;

                if (!(req.userData.role === 'Super Administrator')) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 401, 'Unauthorized access'));

              case 7:
                next();

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function verifyRequester(_x4, _x5, _x6) {
        return _verifyRequester.apply(this, arguments);
      }

      return verifyRequester;
    }()
    /**
     * @description verify and authorize Requester roles
     * 
     * @param {*} req
     * 
     * @param {*} res
     * 
     * @param {*} next
     * 
     * @returns {*} pass control to the next middleware
     */

  }, {
    key: "verifyELectionAdmin",
    value: function () {
      var _verifyELectionAdmin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res, next) {
        var token, userDetail;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
                _context3.next = 3;
                return (0, _tokenProcessor.verifyToken)(token);

              case 3:
                userDetail = _context3.sent;
                req.userData = userDetail;
                console.log('object', userDetail);

                if (!(req.userData.role !== 'Election Administrator')) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 401, 'Unauthorized access'));

              case 8:
                next();

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function verifyELectionAdmin(_x7, _x8, _x9) {
        return _verifyELectionAdmin.apply(this, arguments);
      }

      return verifyELectionAdmin;
    }()
    /**
     * @description verify and authorize Requester roles
     * 
     * @param {*} req
     * 
     * @param {*} res
     * 
     * @param {*} next
     * 
     * @returns {*} pass control to the next middleware
     */

  }, {
    key: "verifyPartyAdmin",
    value: function () {
      var _verifyPartyAdmin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res, next) {
        var token, userDetail;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
                _context4.next = 3;
                return (0, _tokenProcessor.verifyToken)(token);

              case 3:
                userDetail = _context4.sent;
                req.userData = userDetail;

                if (!(req.userData.role !== 'Party Administrator')) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 401, 'Unauthorized access'));

              case 7:
                next();

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function verifyPartyAdmin(_x10, _x11, _x12) {
        return _verifyPartyAdmin.apply(this, arguments);
      }

      return verifyPartyAdmin;
    }()
    /**
     * @description verify and authorize Requester roles
     * 
     * @param {*} req
     * 
     * @param {*} res
     * 
     * @param {*} next
     * 
     * @returns {*} pass control to the next middleware
     */

  }, {
    key: "verifyVoter",
    value: function () {
      var _verifyVoter = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res, next) {
        var token, userDetail;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
                _context5.next = 3;
                return (0, _tokenProcessor.verifyToken)(token);

              case 3:
                userDetail = _context5.sent;
                req.userData = userDetail;
                console.log(req.userData, 'gggggggggggg');

                if (!(req.userData.role !== ('Voter' || 'Candidate'))) {
                  _context5.next = 8;
                  break;
                }

                return _context5.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 401, 'Unauthorized access'));

              case 8:
                next();

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function verifyVoter(_x13, _x14, _x15) {
        return _verifyVoter.apply(this, arguments);
      }

      return verifyVoter;
    }()
  }]);
  return VerifyRoles;
}();

var _default = new VerifyRoles();

exports["default"] = _default;