"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

_mail["default"].setApiKey(process.env.SENDGRID_API_KEY);
/**
 * @name sendEmail
 * @async
 * @description function for sending emails to users
 * @param {String} receiver email of the receipient
 * @param {String} subject subject of email to be sent
 * @param {String} content content text to be sent to user
 * @return {objects} return true for successful email sending or error on failure
 */


var sendEmail =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(receiver, subject, content) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {
              to: receiver,
              from: 'vote@register.com',
              subject: subject,
              html: content
            };
            _context.prev = 1;
            return _context.abrupt("return", _mail["default"].send(data));

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 5]]);
  }));

  return function sendEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = sendEmail;
exports["default"] = _default;