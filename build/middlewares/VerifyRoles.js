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

                if (!(req.userData.role !== 'Requester')) {
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
  }]);
  return VerifyRoles;
}();

var _default = new VerifyRoles();

exports["default"] = _default;