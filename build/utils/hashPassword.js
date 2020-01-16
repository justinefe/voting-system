"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unhashPassword = exports.hashPassword = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

/**
 * Function to hash user password
 * @param {string} password
 * @returns {string} returns encryted password
 */
var hashPassword = function hashPassword(password) {
  return _bcrypt["default"].hashSync(password, 10);
};
/**
 * Function to decrypt a hash password compares it
 * @param {string} password it accepts password
 * @param {string} hashed it accepts user's hashed password
 * @returns {boolean} unhash returns true if comparism is matched
 */


exports.hashPassword = hashPassword;

var unhashPassword = function unhashPassword(password, hashed) {
  return _bcrypt["default"].compareSync(password, hashed);
};

exports.unhashPassword = unhashPassword;