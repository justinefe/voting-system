"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.inValidDateComparison = exports.inValidPartyName = exports.inValidPhoneNumber = exports.inValidGender = exports.inValidAddress = exports.inValidDate = exports.inValidPassword = exports.inValidEmail = exports.inValidName = exports.magicTrimmer = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("../utils");

/**
 *
 * @description magicTrimmer removes leadng and trailing spaces from a string
 *
 * @param {payload} payload is the object that contains the data you want to trim
 *
 */
var magicTrimmer = function magicTrimmer(payload) {
  var data = {};

  if (payload) {
    Object.keys(payload).forEach(function (key) {
      var value = payload[key];
      Object.assign(data, (0, _defineProperty2["default"])({}, key, value.trim()));
    });
    Object.assign(payload, data);
  }

  return payload;
};
/**
   *
   * @description inValidName is function which validates a name
   *
   * @param {name} name is the eniity you want to validate
   *
   * @param {value} value is the data yur want to validate
   *
   * @returns {boolean} return true or false
   */


exports.magicTrimmer = magicTrimmer;

var inValidName = function inValidName(name, value) {
  if (!value) return "".concat(name, " is required");
  if (!/^[a-z]+$/i.test(value)) return "".concat(name, " is not valid");
  return false;
};
/**
   * @description inValidEmail is a function that validates an email
   *
   * @param {email} email is the data you want to verify if its a valid email
   *
   * @returns {string} string is type of data thr function returns
   */


exports.inValidName = inValidName;

var inValidEmail = function inValidEmail(email) {
  if (!email) return 'email is required';
  email = email.toLowerCase();
  if (!/^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) return 'email is not valid';
  return false;
};
/**
   *
   * @description inValidPassword is a function that validates a password
   *
   * @param {string} password is the data you want to validate whether it is alphanumeric
   *
   * @returns {string} string is the type of data the function returns
   */


exports.inValidEmail = inValidEmail;

var inValidPassword = function inValidPassword(password) {
  if (!password) return 'password is required';
  if (password.length < 8) return 'password should be at least eight characters';

  if (!/^[\w]{8,20}$/.test(password)) {
    return 'password should contain at least one Uppercase letter, one lowercase letter, and at least one digit with now space';
  }

  return false;
};
/**
   *
   * @description inValidDate is a function that validates a date
   *
   * @param {string} date is the data you want to validate
   *
   * @returns {string} string is the type of data the function returns
   */


exports.inValidPassword = inValidPassword;

var inValidDate = function inValidDate(date) {
  if (!date) return undefined;
  var decision = (0, _moment["default"])(date, 'MM/DD/YYYY', true).isValid();
  if (!decision) return 'date should be of the form MM/DD/YYYY';
  return false;
};
/**
 * @description inValidAddress is a function that returns address
 * 
 * @param {string} address is the parameter
 * 
 * @returns {string} the type of data the function returns
 * 
 */


exports.inValidDate = inValidDate;

var inValidAddress = function inValidAddress(address) {
  if (!address) return undefined;
  if (!/^[\w\s-.,]+$/i.test(address)) return "".concat(address, " is not valid");
  return false;
};
/**
* @description inValidGender is a function that returns address
* 
* @param {string} gender is the parameter
* 
* @returns {string} the type of data the function returns
* 
*/


exports.inValidAddress = inValidAddress;

var inValidGender = function inValidGender(gender) {
  if (!gender) return undefined;
  gender = gender.toLowerCase();
  if (gender !== ('male' || 'female')) return "".concat(gender, " is not valid");
  return false;
};
/**
* @description inValidPhoneNumber is a function that returns address
* 
* @param {string} number is the parameter
* 
* @returns {string} the type of data the function returns
* 
*/


exports.inValidGender = inValidGender;

var inValidPhoneNumber = function inValidPhoneNumber(number) {
  if (!number) return undefined;
  if (!/^[\d]{8,11}$/.test(number)) return "".concat(number, " is not valid");
  return false;
};
/**
* @description inValidPartyName is a function that returns address
* 
* @param {string} name is the parameter
* 
* @returns {string} the type of data the function returns
* 
*/


exports.inValidPhoneNumber = inValidPhoneNumber;

var inValidPartyName = function inValidPartyName(name) {
  if (!name) return undefined;
  if (!/^[a-z\s?]{4,}$/.test(name)) return "".concat(name, " is not valid");
  return false;
};

exports.inValidPartyName = inValidPartyName;

var inValidDateComparison = function inValidDateComparison(travelDate) {
  var stopageTimeInMillisecode = (0, _utils.getMIlliSeconds)(travelDate);
  var todayDateMilliSec = (0, _utils.getMIlliSeconds)();
  if (stopageTimeInMillisecode <= todayDateMilliSec) return 'Your vote stopage date must be future';
  return stopageTimeInMillisecode;
};

exports.inValidDateComparison = inValidDateComparison;

var validate = function validate(obj) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    if (obj[key]) {
      result[key] = obj[key];
    }

    if (obj[key] === undefined) {
      result[key] = "".concat(key, " is required");
    }
  });

  if (Object.keys(result).length) {
    return result;
  }

  return null;
};

exports.validate = validate;