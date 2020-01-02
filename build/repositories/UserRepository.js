"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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
 * @author TeamCyclops
 *
 * @requires models/User.js
 */
var User = _models["default"].User,
    BlackListedToken = _models["default"].BlackListedToken,
    Role = _models["default"].Role,
    Permission = _models["default"].Permission,
    RolePermission = _models["default"].RolePermission,
    Manager = _models["default"].Manager;
/**
 * User repository class
 *
 * @class
 */

var UserRepository =
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
  function UserRepository() {
    (0, _classCallCheck2["default"])(this, UserRepository);
    this.db = User;
  }
  /**
   * @description Creates a new user account with provided details
   *
   * @param {Object} param users details
   *
   * @return {Object} returns new user details
   */


  (0, _createClass2["default"])(UserRepository, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_ref) {
        var password, email, name, designation, is_verified, _ref$image_url, image_url, _ref$facebook_id, facebook_id, _ref$google_id, google_id, _ref2, dataValues;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                password = _ref.password, email = _ref.email, name = _ref.name, designation = _ref.designation, is_verified = _ref.is_verified, _ref$image_url = _ref.image_url, image_url = _ref$image_url === void 0 ? '' : _ref$image_url, _ref$facebook_id = _ref.facebook_id, facebook_id = _ref$facebook_id === void 0 ? '' : _ref$facebook_id, _ref$google_id = _ref.google_id, google_id = _ref$google_id === void 0 ? '' : _ref$google_id;
                _context.prev = 1;
                _context.next = 4;
                return this.db.create({
                  name: name,
                  email: email,
                  designation: designation,
                  password: password,
                  is_verified: is_verified,
                  image_url: image_url,
                  facebook_id: facebook_id,
                  google_id: google_id
                });

              case 4:
                _ref2 = _context.sent;
                dataValues = _ref2.dataValues;
                return _context.abrupt("return", dataValues);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                throw new Error(_context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 9]]);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * @description Returns users details based on the provided parameters
     *
     * @param {Object} condition checks required users parameter
     *
     * @param {Object} include adds users managers
     *
     * @return {Object} returns user details with managers uuid
     */

  }, {
    key: "getOne",
    value: function () {
      var _getOne = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var condition,
            include,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                condition = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                include = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : '';
                _context2.prev = 2;
                _context2.next = 5;
                return this.db.findOne({
                  where: condition,
                  include: include
                });

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                throw new Error(_context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 8]]);
      }));

      function getOne() {
        return _getOne.apply(this, arguments);
      }

      return getOne;
    }()
    /**
     * @description this is a method that gets all users in the database
     * 
     * @returns {array} returns an array of user objects
     */

  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return User.findAll();

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);
                throw new Error(_context3.t0);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 6]]);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
    /**
     * @description This is a function that finds a user token in the data base
     *
     * @param {Object} condition checks token in db
     *
     * @return {Object} returns token
     */

  }, {
    key: "findToken",
    value: function () {
      var _findToken = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4() {
        var condition,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                condition = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                _context4.prev = 1;
                _context4.next = 4;
                return BlackListedToken.findOne({
                  where: condition
                });

              case 4:
                return _context4.abrupt("return", _context4.sent);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](1);
                throw new Error(_context4.t0);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 7]]);
      }));

      function findToken() {
        return _findToken.apply(this, arguments);
      }

      return findToken;
    }()
    /**
     *
     * @param {string} userId
     *
     * @param {object} changes to update for user
     *
     * @returns {object} updated user
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(userId, changes) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this.getOne({
                  uuid: userId
                });

              case 3:
                _context5.next = 5;
                return User.update(changes, {
                  returning: true,
                  where: {
                    uuid: userId
                  }
                });

              case 5:
                return _context5.abrupt("return", _context5.sent);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                throw new Error(_context5.t0);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function update(_x2, _x3) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
    /**
     * @description gets a list of roles from the database
     * 
     * @returns {*} an array of role names
     */

  }, {
    key: "getRoles",
    value: function () {
      var _getRoles = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6() {
        var roles, roleNames;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return Role.findAll();

              case 3:
                roles = _context6.sent;

                if (roles) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return");

              case 6:
                roleNames = roles.map(function (role) {
                  return role.dataValues.name;
                });
                return _context6.abrupt("return", roleNames);

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](0);
                throw new Error(_context6.t0);

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 10]]);
      }));

      function getRoles() {
        return _getRoles.apply(this, arguments);
      }

      return getRoles;
    }()
    /**
     * @description gets a list of permissions from the database
     * 
     * @param {*} roleId
     * 
     * @returns {array} an array of permission names
     */

  }, {
    key: "getRolePermissions",
    value: function () {
      var _getRolePermissions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(roleId) {
        var _ref3, _ref4, roles;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return Role.findAll({
                  where: {
                    uuid: roleId
                  },
                  include: [{
                    model: Permission,
                    as: 'permissions',
                    required: true,
                    attributes: ['uuid', 'name'],
                    through: {
                      attributes: []
                    }
                  }]
                });

              case 3:
                _ref3 = _context7.sent;
                _ref4 = (0, _slicedToArray2["default"])(_ref3, 1);
                roles = _ref4[0];
                return _context7.abrupt("return", roles.dataValues.permissions);

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7["catch"](0);
                throw new Error(_context7.t0.message);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 9]]);
      }));

      function getRolePermissions(_x4) {
        return _getRolePermissions.apply(this, arguments);
      }

      return getRolePermissions;
    }()
    /**
     * @description gets a list of permissions from the database
     * 
     * @returns {array} an array of permission names
     */

  }, {
    key: "getPermissions",
    value: function () {
      var _getPermissions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8() {
        var permissions, permissionNames;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return Permission.findAll();

              case 3:
                permissions = _context8.sent;

                if (permissions) {
                  _context8.next = 6;
                  break;
                }

                return _context8.abrupt("return");

              case 6:
                permissionNames = permissions.map(function (permission) {
                  return permission.dataValues.name;
                });
                return _context8.abrupt("return", permissionNames);

              case 10:
                _context8.prev = 10;
                _context8.t0 = _context8["catch"](0);
                throw new Error(_context8.t0);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 10]]);
      }));

      function getPermissions() {
        return _getPermissions.apply(this, arguments);
      }

      return getPermissions;
    }()
    /**
     * 
     * @param {string} email 
     * 
     * @param {string} newRole
     * 
     * @returns {object} updated user
     */

  }, {
    key: "setRole",
    value: function () {
      var _setRole = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(email, newRole) {
        var _ref5, uuid, data;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return Role.findOne({
                  where: {
                    name: newRole
                  }
                });

              case 3:
                _ref5 = _context9.sent;
                uuid = _ref5.uuid;
                _context9.next = 7;
                return User.update({
                  role_uuid: uuid,
                  role: newRole
                }, {
                  where: {
                    email: email
                  },
                  returning: true,
                  plain: true
                });

              case 7:
                data = _context9.sent;

                if (!(newRole === 'Manager')) {
                  _context9.next = 11;
                  break;
                }

                _context9.next = 11;
                return Manager.create({
                  uuid: data.uuid
                });

              case 11:
                return _context9.abrupt("return", data);

              case 14:
                _context9.prev = 14;
                _context9.t0 = _context9["catch"](0);
                throw Error(_context9.t0);

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 14]]);
      }));

      function setRole(_x5, _x6) {
        return _setRole.apply(this, arguments);
      }

      return setRole;
    }()
    /**
     * 
     * @param {string} role
     * 
     * @param {string} permission
     * 
     * @returns {object} updated user
     */

  }, {
    key: "setPermission",
    value: function () {
      var _setPermission = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(role, permission) {
        var userRole, userPermission, newRolePermission;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return Role.findOne({
                  where: {
                    name: role
                  }
                });

              case 3:
                userRole = _context10.sent;
                _context10.next = 6;
                return Permission.findOne({
                  where: {
                    name: permission
                  }
                });

              case 6:
                userPermission = _context10.sent;
                _context10.next = 9;
                return RolePermission.create({
                  role_uuid: userRole.uuid,
                  permission_id: userPermission.uuid
                });

              case 9:
                newRolePermission = _context10.sent;
                return _context10.abrupt("return", newRolePermission);

              case 13:
                _context10.prev = 13;
                _context10.t0 = _context10["catch"](0);
                throw new Error(_context10.t0.message);

              case 16:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 13]]);
      }));

      function setPermission(_x7, _x8) {
        return _setPermission.apply(this, arguments);
      }

      return setPermission;
    }()
    /**
     * @param {*} userId
     * 
     * @returns {*} returns a verified user object
     */

  }, {
    key: "verifyUser",
    value: function () {
      var _verifyUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(userId) {
        var user;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return User.update({
                  is_verified: true
                }, {
                  where: {
                    uuid: userId
                  },
                  returning: true
                });

              case 3:
                user = _context11.sent;
                return _context11.abrupt("return", user);

              case 7:
                _context11.prev = 7;
                _context11.t0 = _context11["catch"](0);
                throw new Error(_context11.t0);

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 7]]);
      }));

      function verifyUser(_x9) {
        return _verifyUser.apply(this, arguments);
      }

      return verifyUser;
    }()
    /* @description findOne is a function that search for an office Location
    *
    * @param {object} condition limits the search of the office location
    *
    * @returns {object} the details of the office location that has been searched for
    */
    // eslint-disable-next-line require-jsdoc

  }, {
    key: "findById",
    value: function () {
      var _findById = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12(condition) {
        var tripRequest;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return this.db.findByPk(condition);

              case 3:
                tripRequest = _context12.sent;
                return _context12.abrupt("return", tripRequest);

              case 7:
                _context12.prev = 7;
                _context12.t0 = _context12["catch"](0);
                throw new Error(_context12.t0);

              case 10:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 7]]);
      }));

      function findById(_x10) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }]);
  return UserRepository;
}();

var _default = new UserRepository();

exports["default"] = _default;