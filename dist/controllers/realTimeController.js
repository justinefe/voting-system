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

var _socket = _interopRequireDefault(require("socket.io"));

var _http = _interopRequireDefault(require("http"));

var _sendResponse = require("../utils/sendResponse");

var _ChatRepository = _interopRequireDefault(require("../repositories/ChatRepository"));

/* eslint-disable func-names */

/* eslint-disable class-methods-use-this */
// import socket from 'socket.io';
var io = (0, _socket["default"])(_http["default"]); // console.log('llllll', io);

/**
 * Ezekiel 21:27
 * @module realTimeController
 * @description Controls admin based activities
 */

var realTimeController =
/*#__PURE__*/
function () {
  function realTimeController() {
    (0, _classCallCheck2["default"])(this, realTimeController);
  }

  (0, _createClass2["default"])(realTimeController, [{
    key: "addChat",

    /**
     * @description Handles two way communication from server and client
     *
     * @param {*} req - Request Object
     *
     * @param {*} res - Response Object
     * 
     * @param {next} next - passes control to the middlewware
     *
     * @returns {object} - returns a response object
     *
     * @memberof realTimeController
     */
    value: function () {
      var _addChat = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        var userUuid, _req$body, handle, message, field;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userUuid = req.userData.uuid;
                _req$body = req.body, handle = _req$body.handle, message = _req$body.message;
                _context.prev = 2;
                field = {
                  user_uuid: userUuid,
                  handle: handle,
                  message: message
                };
                io.emit('message', req.body);
                _context.next = 7;
                return _ChatRepository["default"].createOne(field);

              case 7:
                return _context.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, 'You have succesfully chated candidate'));

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                next(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }));

      function addChat(_x, _x2, _x3) {
        return _addChat.apply(this, arguments);
      }

      return addChat;
    }()
  }]);
  return realTimeController;
}();

var _default = new realTimeController();

exports["default"] = _default;