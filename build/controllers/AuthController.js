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

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

var _utils = require("../utils");

var _tokenProcessor = require("../modules/tokenProcessor");

var _sendResponse = require("../utils/sendResponse");

var _validator = require("../modules/validator");

var _emails = _interopRequireDefault(require("../services/emails"));

var _hashPassword = require("../utils/hashPassword");

/* eslint-disable class-methods-use-this */

/* eslint-disable camelcase */
// import userInfo from '../utils/getUserInfo';

/**
 * @description User controller
 */
var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    (0, _classCallCheck2["default"])(this, AuthController);
  }

  (0, _createClass2["default"])(AuthController, [{
    key: "signup",

    /**
     * @param {Object} req - HTTP request object
     *
     * @param {Object} res - HTTP response object
     *
     * @param {Function} next - Function to trigger next middleware
     *
     * @return {Object} Return success message and account creation status
     */
    value: function () {
      var _signup = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_ref, res, next) {
        var protocol, headers, body, userData, email, name, result, newUser, token, link;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                protocol = _ref.protocol, headers = _ref.headers, body = _ref.body;
                _context.prev = 1;
                userData = (0, _validator.magicTrimmer)(body);
                email = userData.email, name = userData.name;
                _context.next = 6;
                return _UserRepository["default"].getOne({
                  email: email
                });

              case 6:
                result = _context.sent;

                if (result) {
                  _context.next = 20;
                  break;
                }

                body.password = (0, _hashPassword.hashPassword)(body.password);
                _context.next = 11;
                return _UserRepository["default"].create(body);

              case 11:
                newUser = _context.sent;
                token = (0, _tokenProcessor.createToken)({
                  uuid: newUser.uuid,
                  name: name,
                  email: email,
                  role: newUser.role
                });
                newUser.token = token;
                link = "".concat(protocol, "//").concat(headers.host, "/api/v1/auth/confirm_email?token=").concat(token, "&id=").concat(newUser.uuid);
                _context.next = 17;
                return (0, _emails["default"])(email, 'Barefoot Nomad Account Verification', "<strong> Please kindly click on the link below to verify your account <br/> ".concat(link, "</strong>"));

              case 17:
                (0, _sendResponse.sendSuccessResponse)(res, 201, {
                  message: 'User account created successfully'
                });
                _context.next = 21;
                break;

              case 20:
                return _context.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 409, "User ".concat(email, " already exists")));

              case 21:
                _context.next = 26;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", next(_context.t0));

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 23]]);
      }));

      function signup(_x, _x2, _x3) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
    /**
     * @param {object} req
     *
     * @param {object} res
     *
     * @returns {object} returns a response object
     */

  }, {
    key: "confirmEmail",
    value: function () {
      var _confirmEmail = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var token, verify, user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = req.query.token;
                _context2.prev = 1;
                _context2.next = 4;
                return (0, _tokenProcessor.verifyToken)(token);

              case 4:
                verify = _context2.sent;
                _context2.next = 7;
                return _UserRepository["default"].getOne({
                  uuid: verify.uuid
                });

              case 7:
                user = _context2.sent;

                if (!(user.dataValues.is_verified === true)) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, 'Account verified already'));

              case 10:
                _context2.next = 12;
                return _UserRepository["default"].verifyUser(verify.uuid);

              case 12:
                return _context2.abrupt("return", (0, _sendResponse.successResponse)(res, 200, 'Email verified successfully'));

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, 'Unable to verifiy email'));

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 15]]);
      }));

      function confirmEmail(_x4, _x5) {
        return _confirmEmail.apply(this, arguments);
      }

      return confirmEmail;
    }()
    /**
     * @description handles login from Google and Facebook
     *
     * @param {object} user accepts user details object
     *
     * @param {res} res object*
     *
     * @param {function} next returns error if process fails
     *
     * @returns {object} returns a new or existing user's details
     */

  }, {
    key: "social",
    value: function () {
      var _social = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(_ref2, res, next) {
        var user, social_id, name, image, email, provider, checkUser, newUser;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                user = _ref2.user;
                _context3.prev = 1;
                social_id = user.social_id, name = user.name, image = user.image, email = user.email, provider = user.provider;

                if (!(provider === 'facebook')) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 6;
                return _UserRepository["default"].getOne({
                  facebook_id: social_id
                });

              case 6:
                _context3.t0 = _context3.sent;
                _context3.next = 12;
                break;

              case 9:
                _context3.next = 11;
                return _UserRepository["default"].getOne({
                  google_id: social_id
                });

              case 11:
                _context3.t0 = _context3.sent;

              case 12:
                checkUser = _context3.t0;

                if (!checkUser) {
                  _context3.next = 15;
                  break;
                }

                return _context3.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 201, userInfo(checkUser)));

              case 15:
                _context3.next = 17;
                return _UserRepository["default"].create({
                  name: name,
                  email: email,
                  is_verified: true,
                  image_url: image,
                  facebook_id: provider === 'facebook' ? social_id : '',
                  google_id: provider === 'google' ? social_id : '',
                  role: 'employee'
                });

              case 17:
                newUser = _context3.sent;
                return _context3.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 201, userInfo(newUser)));

              case 21:
                _context3.prev = 21;
                _context3.t1 = _context3["catch"](1);
                return _context3.abrupt("return", next(_context3.t1));

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 21]]);
      }));

      function social(_x6, _x7, _x8) {
        return _social.apply(this, arguments);
      }

      return social;
    }()
    /**
     * @description Uses login with email and password
     *
     * @param {req} req the request object
     *
     * @param {res} res the response object
     *
     * @param {object} body this is the body of the request
     *
     * @returns {obj} returns an response object
     */

  }, {
    key: "signin",
    value: function () {
      var _signin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(_ref3, res) {
        var body, email, foundUser, password, confirmPassword, token, userInformation;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                body = _ref3.body;
                email = body.email;
                _context4.next = 4;
                return _UserRepository["default"].getOne({
                  email: email
                });

              case 4:
                foundUser = _context4.sent;
                password = body.password;

                if (foundUser) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 404, 'User not found'));

              case 8:
                confirmPassword = (0, _hashPassword.unhashPassword)(password, foundUser.dataValues.password);

                if (confirmPassword) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, 'Incorrect Password'));

              case 11:
                if (foundUser.dataValues.is_verified) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 401, 'Verify Your Account'));

              case 13:
                _context4.next = 15;
                return (0, _tokenProcessor.createToken)({
                  uuid: foundUser.uuid,
                  role: foundUser.role,
                  email: foundUser.email,
                  role_uuid: foundUser.role_uuid
                });

              case 15:
                token = _context4.sent;
                userInformation = {
                  token: token
                };
                return _context4.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, userInformation));

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function signin(_x9, _x10) {
        return _signin.apply(this, arguments);
      }

      return signin;
    }()
    /**
    * @description Sends reset link to user Email
    *
    * @param {Object} req - Request object
    *
    * @param {Object} res - Response object
    *
    * @returns {Object} object containing user data which will be embedded in link sent to user
    *
    * @memberof UserController
    */

  }, {
    key: "sendResetLink",
    value: function () {
      var _sendResetLink = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var email, _ref4, uuid, token, link;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                email = req.body.email;

                if ((0, _validator.inValidEmail)(email)) {
                  _context5.next = 19;
                  break;
                }

                _context5.next = 4;
                return _UserRepository["default"].getOne({
                  email: email
                });

              case 4:
                _ref4 = _context5.sent;
                uuid = _ref4.uuid;
                _context5.next = 8;
                return (0, _tokenProcessor.createToken)({
                  uuid: uuid,
                  email: email
                });

              case 8:
                token = _context5.sent;
                link = "".concat(req.protocol, "//").concat(req.headers.host, "/api/v1/auth/reset_password/").concat(uuid, "/").concat(token);
                _context5.prev = 10;
                _context5.next = 13;
                return (0, _emails["default"])(email, 'Barefoot Nomad Password Reset', "Please kindly click the link below to reset your password <br/> ".concat(link));

              case 13:
                return _context5.abrupt("return", (0, _sendResponse.successResponse)(res, 200, 'A password reset link has been sent to your mailbox'));

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](10);
                return _context5.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 500, 'Unable to perform the operation at the moment'));

              case 19:
                return _context5.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, (0, _validator.inValidEmail)(email)));

              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[10, 16]]);
      }));

      function sendResetLink(_x11, _x12) {
        return _sendResetLink.apply(this, arguments);
      }

      return sendResetLink;
    }()
    /**
     * @description Updates the user's password
     *
     * @param {object} req - request object
     *
     * @param {object} res - response object
     *
     * @param {object} next - response object
     *
     * @returns {object} either error or success
     */

  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(req, res, next) {
        var password, uuid;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                password = req.body.password;
                uuid = req.params.uuid;

                if ((0, _validator.inValidPassword)(password)) {
                  _context6.next = 12;
                  break;
                }

                _context6.prev = 3;
                _context6.next = 6;
                return _UserRepository["default"].update(uuid, {
                  password: password
                });

              case 6:
                return _context6.abrupt("return", (0, _sendResponse.successResponse)(res, 200, 'Password Reset Successfully'));

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](3);
                return _context6.abrupt("return", next(_context6.t0));

              case 12:
                return _context6.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, (0, _validator.inValidPassword)(password)));

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[3, 9]]);
      }));

      function resetPassword(_x13, _x14, _x15) {
        return _resetPassword.apply(this, arguments);
      }

      return resetPassword;
    }()
    /**
     * @description Function to get specific user details
     *
     * @param {Object} req - HTTP request object
     *
     * @param {Object} res - HTTP response object
     *
     * @param {Function} next - Function to trigger next middleware
     *
     * @return {Object} Object resoponse with current user information status
     */

  }, {
    key: "show",
    value: function () {
      var _show = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(_ref5, res, next) {
        var userData, email, _ref6, user;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                userData = _ref5.userData;
                email = userData.dataValues.email;
                _context7.prev = 2;
                _context7.next = 5;
                return _UserRepository["default"].getOne({
                  email: email
                });

              case 5:
                _ref6 = _context7.sent;
                user = _ref6.dataValues;

                if (!user) {
                  _context7.next = 10;
                  break;
                }

                user.password = undefined;
                return _context7.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, user));

              case 10:
                return _context7.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, 'User not found'));

              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7["catch"](2);
                next(_context7.t0);

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 13]]);
      }));

      function show(_x16, _x17, _x18) {
        return _show.apply(this, arguments);
      }

      return show;
    }()
    /**
     * @description logs out a user
     *
     * @param {object} req request from body to log out
     *
     * @param {object} res response to the body
     *
     * @returns {object} success
     */

  }, {
    key: "signout",
    value: function () {
      var _signout = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(req, res) {
        var token;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
                _context8.next = 4;
                return (0, _utils.blackListThisToken)(token);

              case 4:
                return _context8.abrupt("return", (0, _sendResponse.sendSuccessResponse)(res, 200, 'You have succesfully signout'));

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](0);
                return _context8.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 400, _context8.t0));

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 7]]);
      }));

      function signout(_x19, _x20) {
        return _signout.apply(this, arguments);
      }

      return signout;
    }()
    /**
     * @description Function to update user details
     *
     * @param {Object} req - HTTP request object
     *
     * @param {Object} res - HTTP response object
     *
     * @param {Function} next - Function to trigger next middleware
     *
     * @return {Object} Object resoponse with current user created status
     */

  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(req, res, next) {
        var body, userData, email, result, userId, _ref7, _ref8, numberOfEdits, _ref8$, dataValues;

        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                body = req.body;
                _context9.prev = 1;
                userData = (0, _validator.magicTrimmer)(body);
                email = userData.email;
                _context9.next = 6;
                return _UserRepository["default"].getOne({
                  email: email
                });

              case 6:
                result = _context9.sent;

                if (result) {
                  _context9.next = 19;
                  break;
                }

                userId = req.userData.dataValues.uuid;
                _context9.next = 11;
                return _UserRepository["default"].update(userId, body);

              case 11:
                _ref7 = _context9.sent;
                _ref8 = (0, _slicedToArray2["default"])(_ref7, 2);
                numberOfEdits = _ref8[0];
                _ref8$ = (0, _slicedToArray2["default"])(_ref8[1], 1);
                dataValues = _ref8$[0].dataValues;
                numberOfEdits > 0 ? (0, _sendResponse.sendSuccessResponse)(res, 200, dataValues) : (0, _sendResponse.sendSuccessResponse)(res, 200, 'No edit made');
                _context9.next = 20;
                break;

              case 19:
                return _context9.abrupt("return", (0, _sendResponse.sendErrorResponse)(res, 409, "User ".concat(email, " already exists")));

              case 20:
                _context9.next = 25;
                break;

              case 22:
                _context9.prev = 22;
                _context9.t0 = _context9["catch"](1);
                next(_context9.t0);

              case 25:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[1, 22]]);
      }));

      function update(_x21, _x22, _x23) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return AuthController;
}();

var _default = new AuthController();

exports["default"] = _default;