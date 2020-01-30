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

/* eslint-disable require-jsdoc */
var Notification = _models["default"].Notification;
/**
 * @description NotificaionRepository handles method that query our database
 */

var NotificationRepository =
/*#__PURE__*/
function () {
  /**
   * @description constructor handles the properties/univsersal data for our requestRepository
   */
  function NotificationRepository() {
    (0, _classCallCheck2["default"])(this, NotificationRepository);
    this.db = Notification;
  }
  /**
   * @description Returns user's selected notifications
   *
   * @param {Object} condition - Checks notification based on the condition
   *
   * @return {Object} returns selected notification details
   */


  (0, _createClass2["default"])(NotificationRepository, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var condition,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                condition = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.prev = 1;
                _context.next = 4;
                return this.db.findAll({
                  where: condition
                });

              case 4:
                return _context.abrupt("return", _context.sent);

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

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
    /**
    * @description NotificationRepository handles method that query our database
    *
    * @param {object} notificationDetails refers to the notification data
    *
    * @returns {object} the details of the request that was created
    */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(notificationDetails) {
        var _ref, dataValues;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.db.create(notificationDetails);

              case 3:
                _ref = _context2.sent;
                dataValues = _ref.dataValues;
                return _context2.abrupt("return", dataValues);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                throw new Error(_context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * @description NotificationRepository handles method that query our database
     *
     * @param {object} condition refers to the notification data
     *
     * @returns {object} the details of the request that was created
     */
    // eslint-disable-next-line class-methods-use-this

  }, {
    key: "findNotificationById",
    value: function () {
      var _findNotificationById = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(condition) {
        var include, tripRequest;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                include = '';
                _context3.next = 4;
                return this.db.findOne({
                  where: condition,
                  include: include
                });

              case 4:
                tripRequest = _context3.sent;
                return _context3.abrupt("return", tripRequest);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                throw new Error(_context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 8]]);
      }));

      function findNotificationById(_x2) {
        return _findNotificationById.apply(this, arguments);
      }

      return findNotificationById;
    }()
  }]);
  return NotificationRepository;
}(); // async getOne(condition = {}, include = '') {
//   try {
//     return await this.db.findOne({ where: condition, include });
//   } catch (e) {
//     throw new Error(e);
//   }
// }


var _default = new NotificationRepository();

exports["default"] = _default;