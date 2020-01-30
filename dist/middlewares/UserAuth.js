"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _validator = require("../modules/validator");

var _sendResponse = require("../utils/sendResponse");

/**
   * @description userAuth is clas that handles user data validation
   */
var userAuth =
/*#__PURE__*/
function () {
  function userAuth() {
    (0, _classCallCheck2["default"])(this, userAuth);
  }

  (0, _createClass2["default"])(userAuth, null, [{
    key: "signup",

    /**
       *
       * @param {req} req object
       *
       * @param {res} res object
       *
       * @param {next} next forwards request to the next middleware function
       *
       * @returns {obj} reurns an response object
       */
    value: function signup(req, res, next) {
      var userData = (0, _validator.magicTrimmer)(req.body);
      var first_name = userData.first_name,
          last_name = userData.last_name,
          email = userData.email,
          password = userData.password;
      var schema = {
        first_name: (0, _validator.inValidName)('first_name', first_name),
        last_name: (0, _validator.inValidName)('last_name', last_name),
        email: (0, _validator.inValidEmail)(email),
        password: (0, _validator.inValidPassword)(password)
      };
      var error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      req.body = userData;
      return next();
    }
    /**
       *
       * @param {req} req object
       *
       * @param {res} res object
       *
       * @param {next} next forwards request to the next middleware function
       *
       * @returns {obj} reurns an response object
       */

  }, {
    key: "signin",
    value: function signin(req, res, next) {
      var userInfo = (0, _validator.magicTrimmer)(req.body);
      var email = userInfo.email,
          password = userInfo.password;
      var schema = {
        email: (0, _validator.inValidEmail)(email),
        password: (0, _validator.inValidPassword)(password)
      };
      var error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      return next();
    }
  }]);
  return userAuth;
}();

exports["default"] = userAuth;