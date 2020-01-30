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

/* eslint-disable no-plusplus */

/* eslint-disable linebreak-style */

/* eslint-disable no-useless-catch */

/* eslint-disable class-methods-use-this */

/* eslint-disable camelcase */

/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TheJust
 *
 * @requires models/User.js
 */
var Result = _models["default"].Result;
/**
 * Result repository class
 *
 * @class
 */

var ResultRepository =
/*#__PURE__*/
function () {
  /**
     * @description constructor handles the user model
     *
     * User Model constructor
     *
     * @constructor
     *
     */
  function ResultRepository() {
    (0, _classCallCheck2["default"])(this, ResultRepository);
    this.db = Result;
  }
  /**
     * @description Creates a new user account with provided details
     *
     * @param {Object} field users details
     *
     * @return {Object} returns new user details
     */


  (0, _createClass2["default"])(ResultRepository, [{
    key: "CreateAll",
    value: function () {
      var _CreateAll = (0, _asyncToGenerator2["default"])(
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
                console.log(this.db, 'dvadfdfddsfdf');
                _context.next = 5;
                return this.db.bulkCreate(field);

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                throw new Error(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function CreateAll() {
        return _CreateAll.apply(this, arguments);
      }

      return CreateAll;
    }()
    /**
       * @description Creates a new user account with provided details
       *
       * @param {Object} field users details
       *
       * @return {Object} returns new user details
       */

  }, {
    key: "CreateOne",
    value: function () {
      var _CreateOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var field,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                field = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.prev = 1;
                _context2.next = 4;
                return this.db.create(field);

              case 4:
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](1);
                throw new Error(_context2.t0);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 6]]);
      }));

      function CreateOne() {
        return _CreateOne.apply(this, arguments);
      }

      return CreateOne;
    }()
  }]);
  return ResultRepository;
}();

var _default = new ResultRepository();

exports["default"] = _default;