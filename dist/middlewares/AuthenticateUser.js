"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sendResponse = require("../utils/sendResponse");

var _tokenProcessor = require("../modules/tokenProcessor");

var _index = require("../utils/index");

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

var _default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var rawToken, err, isblocked, token, _verifyToken, email, user, error;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            rawToken = req.headers.authorization || req.headers['x-access-token'] || req.body.token || req.query.slt;
            err = 'Please provide a token';

            if (rawToken) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 401, err));

          case 4:
            _context.next = 6;
            return (0, _index.isBlackListed)(rawToken);

          case 6:
            isblocked = _context.sent;

            if (!isblocked) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 403, 'Unauthorized'));

          case 9:
            _context.prev = 9;
            token = rawToken.split(' ')[1];
            _verifyToken = (0, _tokenProcessor.verifyToken)(token), email = _verifyToken.email;
            _context.next = 14;
            return _UserRepository["default"].getOne({
              email: email
            });

          case 14:
            user = _context.sent;

            if (user) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 403, 'Unauthorized'));

          case 17:
            req.userData = user;
            next();
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](9);
            error = _context.t0.message ? 'Authentication Failed' : _context.t0;
            (0, _sendResponse.sendErrorResponse)(res, 401, error);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 21]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports["default"] = _default;