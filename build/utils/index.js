"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMessage = exports.createMessage = exports.isBlackListed = exports.blackListThisToken = exports.getDay = exports.getMIlliSeconds = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

var _NotificationRepository = _interopRequireDefault(require("../repositories/NotificationRepository"));

var _TripRequestRepository = _interopRequireDefault(require("../repositories/TripRequestRepository"));

// eslint-disable-next-line arrow-parens
var getMIlliSeconds = function getMIlliSeconds(date) {
  return date ? new Date(date).getTime() : new Date().getTime();
};

exports.getMIlliSeconds = getMIlliSeconds;

var getDay = function getDay(date) {
  var dateInMillisec = getMIlliSeconds(date);
  return Math.floor(dateInMillisec / 86400000);
};

exports.getDay = getDay;
var BlackListedToken = _models["default"].BlackListedToken;
/**
 *
 * @param {string} token it acepts a valid token
 * @returns {boolean} returns true when token is found otherwise false
 */

var isBlackListed =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(token) {
    var blockedToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _UserRepository["default"].findToken({
              token: token
            });

          case 2:
            blockedToken = _context.sent;
            return _context.abrupt("return", !!blockedToken);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isBlackListed(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @param {text} token accepts token
 *
 * @returns {string} returns error when it could not create a user
 */


exports.isBlackListed = isBlackListed;

var blackListThisToken =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(token) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return BlackListedToken.create({
              token: token
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function blackListThisToken(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.blackListThisToken = blackListThisToken;

var createMessage =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(message, status, notificationType, userUuid) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = {
              message: message,
              status: status,
              notification_type: notificationType,
              user_uuid: userUuid
            };

            _NotificationRepository["default"].create(data);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createMessage(_x3, _x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createMessage = createMessage;

var updateMessage =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(changes, tripUuid) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _TripRequestRepository["default"].update(changes, tripUuid);

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateMessage(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateMessage = updateMessage;