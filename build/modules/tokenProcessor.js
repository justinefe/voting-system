"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.createToken = void 0;

var _dotenv = require("dotenv");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/* eslint-disable linebreak-style */
(0, _dotenv.config)();
/**
 *
 * @param {object} payload
 * @returns {string} token
 */

var createToken = function createToken(payload) {
  var token = _jsonwebtoken["default"].sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });

  return token;
};
/**
 *
 * @param {string} token
 * @returns {object} verifiedToken
 */


exports.createToken = createToken;

var verifyToken = function verifyToken(token) {
  var verifiedToken = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });

  return verifiedToken;
};

exports.verifyToken = verifyToken;