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

var _models = _interopRequireDefault(require("../models"));

/* eslint-disable valid-jsdoc */

/* eslint-disable require-jsdoc */

/**
 * @fileoverview Contains the User Party Repository class, an interface for querying User table
 *
 * @author TheJust
 *
 * @requires models/office_position.js
 */
var chat = _models["default"].chat;
/**
 * @class
 */

var ChatRepository =
/*#__PURE__*/
function () {
  /**
    * @description constructor handles the user model
    *
    * candidate model constructor
    *
    * @constructor
    *
    */
  function ChatRepository() {
    (0, _classCallCheck2["default"])(this, ChatRepository);
    this.db = chat;
  }
  /**
   * @description  Creates a candidate
   * 
   * @param field describes the object keys and values to be created
   * 
   * @returns the created field data
   */


  (0, _createClass2["default"])(ChatRepository, [{
    key: "createOne",
    value: function () {
      var _createOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var field,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                field = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.prev = 1;
                _context.next = 4;
                return this.db.create(field);

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                throw new Error(_context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6]]);
      }));

      function createOne() {
        return _createOne.apply(this, arguments);
      }

      return createOne;
    }()
  }]);
  return ChatRepository;
}();

var _default = new ChatRepository();

exports["default"] = _default;