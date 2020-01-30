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
 * @requires models/vote.js
 */
var vote = _models["default"].vote,
    candidate = _models["default"].candidate,
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
    this.db = vote;
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
            condition,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                changes = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
                condition = _args3.length > 1 ? _args3[1] : undefined;
                _context3.prev = 2;
                _context3.next = 5;
                return this.getOne(condition);

              case 5:
                _context3.next = 7;
                return this.db.update(changes, {
                  where: condition
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
     * @description  Creates a candidate
     * 
     * @param field describes the object keys and values to be created
     * 
     * @returns the created field data
     */

  }, {
    key: "CreateAll",
    value: function () {
      var _CreateAll = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        var field,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                field = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                _context4.prev = 1;
                _context4.next = 4;
                return this.db.bulkCreate(field);

              case 4:
                _context4.next = 9;
                break;

              case 6:
                _context4.prev = 6;
                _context4.t0 = _context4["catch"](1);
                throw new Error(_context4.t0);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 6]]);
      }));

      function CreateAll() {
        return _CreateAll.apply(this, arguments);
      }

      return CreateAll;
    }()
    /**
     * @description  Creates a candidate
     * 
     * @param field describes the object keys and values to be created
     * 
     * @returns the created field data
     */

  }, {
    key: "destroyAll",
    value: function () {
      var _destroyAll = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.db.destroy({
                  where: {},
                  truncate: true
                });

              case 3:
                _context5.next = 8;
                break;

              case 5:
                _context5.prev = 5;
                _context5.t0 = _context5["catch"](0);
                throw new Error(_context5.t0);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 5]]);
      }));

      function destroyAll() {
        return _destroyAll.apply(this, arguments);
      }

      return destroyAll;
    }()
  }, {
    key: "findMaxmum",
    value: function () {
      var _findMaxmum = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6() {
        var condition,
            _args6 = arguments;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                condition = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
                _context6.prev = 1;
                _context6.next = 4;
                return this.db.max('votes', {
                  where: condition
                });

              case 4:
                return _context6.abrupt("return", _context6.sent);

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](1);
                throw new Error(_context6.t0);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 7]]);
      }));

      function findMaxmum() {
        return _findMaxmum.apply(this, arguments);
      }

      return findMaxmum;
    }()
  }, {
    key: "findSum",
    value: function () {
      var _findSum = (0, _asyncToGenerator2["default"])(
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
                return this.db.sum('votes', {
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

      function findSum() {
        return _findSum.apply(this, arguments);
      }

      return findSum;
    }()
    /**
     * @description  Creates a candidate
     * 
     * @param field describes the object keys and values to be created
     * 
     * @returns the created field data
     */

  }, {
    key: "Vote",
    value: function () {
      var _Vote = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8() {
        var condition,
            checkcondition,
            voteValue,
            increasedVote,
            _args8 = arguments;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                condition = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : {};
                _context8.prev = 1;
                _context8.next = 4;
                return this.getOne(condition);

              case 4:
                checkcondition = _context8.sent;
                voteValue = checkcondition.votes;
                increasedVote = voteValue + 1;
                _context8.next = 9;
                return this.update({
                  votes: Number(increasedVote)
                }, condition);

              case 9:
                _context8.next = 14;
                break;

              case 11:
                _context8.prev = 11;
                _context8.t0 = _context8["catch"](1);
                throw new Error(_context8.t0);

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 11]]);
      }));

      function Vote() {
        return _Vote.apply(this, arguments);
      }

      return Vote;
    }()
    /**
     * @description Returns party details based on the provided parameters
     *
     * @param {Object} condition checks required party parameter
     *
     * @param {Object} include adds party 
     *
     * @return {Object} returns party details 
     */

  }, {
    key: "getOneAll",
    value: function () {
      var _getOneAll = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9() {
        var condition,
            _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                condition = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
                _context9.prev = 1;
                _context9.next = 4;
                return this.db.findOne({
                  where: condition,
                  include: [{
                    model: candidate,
                    as: 'candidate',
                    include: [{
                      model: User,
                      as: 'user',
                      where: {
                        role: 'Candidate'
                      },
                      required: false
                    }]
                  }]
                });

              case 4:
                return _context9.abrupt("return", _context9.sent);

              case 7:
                _context9.prev = 7;
                _context9.t0 = _context9["catch"](1);
                throw new Error(_context9.t0);

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[1, 7]]);
      }));

      function getOneAll() {
        return _getOneAll.apply(this, arguments);
      }

      return getOneAll;
    }()
  }]);
  return CandidateRepository;
}();

var _default = new CandidateRepository();

exports["default"] = _default;