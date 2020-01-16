"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.inValidLocationId = exports.inValidReturnType = exports.inValidDateComparison = exports.inValidDate = exports.inValidPassword = exports.inValidEmail = exports.inValidName = exports.magicTrimmer = void 0;

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
  if (!/^[A-Za-z]+\s([A-Za-z]+\s)?[A-Za-z]+$/.test(value)) return "".concat(name, " is not valid");
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

  if (!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/^[a-zA-Z0-9]+$/.test(password)) {
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

exports.inValidDate = inValidDate;

var inValidDateComparison = function inValidDateComparison(travelDate, returnDate) {
  var travelDateMilliSec = (0, _utils.getMIlliSeconds)(travelDate);
  var todayDateMilliSec = (0, _utils.getMIlliSeconds)();
  var travelDay = (0, _utils.getDay)(travelDate);
  var returnDay = (0, _utils.getDay)(returnDate);
  if (travelDateMilliSec <= todayDateMilliSec) return 'Your travel date must be a future date';
  if (returnDay < travelDay) return 'You cannot enter a return date that is before your travel date';
  return false;
};

exports.inValidDateComparison = inValidDateComparison;

var inValidReturnType = function inValidReturnType(condition, payload) {
  if (!payload) return undefined;
  var types = condition === 'request type' ? ['oneWayTrip', 'returnTrip'] : ['singleCity', 'multiCity'];
  var type1 = types[0],
      type2 = types[1];
  if (!types.includes(payload)) return "".concat(condition, " must be either ").concat(type1, " or ").concat(type2);
  return false;
};

exports.inValidReturnType = inValidReturnType;

var inValidLocationId = function inValidLocationId(locationId) {
  if (!locationId) return undefined;

  if (!/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(locationId)) {
    return 'Your departure/destination should contain the uuid of the office location';
  }

  return false;
};

exports.inValidLocationId = inValidLocationId;

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