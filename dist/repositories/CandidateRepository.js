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

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = _interopRequireDefault(require("../models"));

/* eslint-disable valid-jsdoc */

/* eslint-disable require-jsdoc */

/**
 * @fileoverview Contains the User Party Repository class, an interface for querying User table
 *
 * @author TheJust
 *
 * @requires models/candidate.js
 */
var candidate = _models["default"].candidate,
    party = _models["default"].party,
    User = _models["default"].User;
/**
 * @class
 */

var CandidateRepository =
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
  function CandidateRepository() {
    (0, _classCallCheck2["default"])(this, CandidateRepository);
    this.db = candidate;
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


  (0, _createClass2["default"])(CandidateRepository, [{
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
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(
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

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     *
     * @param {string} changes
     *
     * @param {object} userId to update for user
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
            userId,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                changes = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                userId = _args3.length > 1 ? _args3[1] : undefined;
                _context3.prev = 2;
                _context3.next = 5;
                return this.getOne({
                  uuid: userId
                });

              case 5:
                _context3.next = 7;
                return this.db.update(changes, {
                  where: {
                    uuid: userId
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
    /**
      *
      * @param {string} changes
      *
      * @param {object} userId to update for user
      *
      * @returns {object} updated user
      */

  }, {
    key: "findAllCandidate",
    value: function () {
      var _findAllCandidate = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.db.findAll();

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](0);
                throw new Error(_context4.t0);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 6]]);
      }));

      function findAllCandidate() {
        return _findAllCandidate.apply(this, arguments);
      }

      return findAllCandidate;
    }()
    /**
     *
     * @param {string} changes
     *
     * @param {object} userId to update for user
     *
     * @returns {object} updated user
     */

  }, {
    key: "findOne",
    value: function () {
      var _findOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5() {
        var condition,
            _args5 = arguments;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                condition = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
                _context5.prev = 1;
                _context5.next = 4;
                return this.db.findOne({
                  include: [{
                    as: 'user',
                    model: User,
                    where: condition,
                    required: true
                  }]
                });

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](1);
                throw new Error(_context5.t0);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 7]]);
      }));

      function findOne() {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
    /**
     *
     * @param {string} changes
     *
     * @param {object} userId to update for user
     *
     * @returns {object} updated user
     */

  }, {
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.db.findAll({
                  include: [{
                    as: 'user',
                    model: User
                  }]
                });

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);
                throw new Error(_context6.t0);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 6]]);
      }));

      function findAll() {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
    /**
     *
     * @param {string} changes
     *
     * @param {object} userId to update for user
     *
     * @returns {object} updated user
     */

  }, {
    key: "findAccepted",
    value: function () {
      var _findAccepted = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7() {
        var condition,
            _args7 = arguments;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                condition = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
                _context7.prev = 1;
                _context7.next = 4;
                return this.db.findAll({
                  where: condition
                });

              case 4:
                return _context7.abrupt("return", _context7.sent);

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](1);
                throw new Error(_context7.t0);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 7]]);
      }));

      function findAccepted() {
        return _findAccepted.apply(this, arguments);
      }

      return findAccepted;
    }()
    /**
     *
     * @param {string} changes
     *
     * @param {object} userId to update for user
     *
     * @returns {object} updated user
     */

  }, {
    key: "deleteOne",
    value: function () {
      var _deleteOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8() {
        var Item,
            _args8 = arguments;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                Item = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
                _context8.prev = 1;
                _context8.next = 4;
                return this.db.destroy({
                  where: Item
                });

              case 4:
                _context8.next = 9;
                break;

              case 6:
                _context8.prev = 6;
                _context8.t0 = _context8["catch"](1);
                throw new Error(_context8.t0);

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 6]]);
      }));

      function deleteOne() {
        return _deleteOne.apply(this, arguments);
      }

      return deleteOne;
    }()
  }]);
  return CandidateRepository;
}();

var _default = new CandidateRepository();

exports["default"] = _default;