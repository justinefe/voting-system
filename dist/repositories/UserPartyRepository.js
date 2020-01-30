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
 * @requires models/Party.js
 */
// import CandidateRepository from './CandidateRepository';
var userParty = _models["default"].user_party;
/**
 * @class
 */

var UserPartyRepository =
/*#__PURE__*/
function () {
  /**
    * @description constructor handles the user model
    *
    * Party model constructor
    *
    * @constructor
    *
    */
  function UserPartyRepository() {
    (0, _classCallCheck2["default"])(this, UserPartyRepository);
    this.db = userParty;
  }
  /**
   * @description Returns party details based on the provided parameters
   *
   * @param {Object} condition checks required party parameter
   *
   * @param {Object} include adds party 
   *
   * @return {Object} returns party details 
   */


  (0, _createClass2["default"])(UserPartyRepository, [{
    key: "getOne",
    value: function () {
      var _getOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var condition,
            include,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                condition = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                include = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
                _context.prev = 2;
                _context.next = 5;
                return this.db.findOne({
                  where: condition,
                  include: include
                });

              case 5:
                return _context.abrupt("return", _context.sent);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);
                throw new Error(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 8]]);
      }));

      function getOne() {
        return _getOne.apply(this, arguments);
      }

      return getOne;
    }()
    /**
     * @description  Creates a candidate
     * 
     * @param field describes the object keys and values to be created
     * 
     * @returns the created field data
     */

  }, {
    key: "createOne",
    value: function () {
      var _createOne = (0, _asyncToGenerator2["default"])(
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

      function createOne() {
        return _createOne.apply(this, arguments);
      }

      return createOne;
    }()
    /**
     *
     * @param {string} changes
     *
     * @param {object} partyUuid to update for user
     *
     * @returns {object} updated user
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        var changes,
            partyUuid,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                changes = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                partyUuid = _args3.length > 1 ? _args3[1] : undefined;
                _context3.prev = 2;
                _context3.next = 5;
                return this.getOne({
                  party_uuid: partyUuid
                });

              case 5:
                _context3.next = 7;
                return this.db.update(changes, {
                  where: {
                    party_uuid: partyUuid
                  }
                });

              case 7:
                return _context3.abrupt("return", _context3.sent);

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](2);
                throw new Error(_context3.t0);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 10]]);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return UserPartyRepository;
}();

var _default = new UserPartyRepository();

exports["default"] = _default;