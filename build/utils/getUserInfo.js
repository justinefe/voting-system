"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tokenProcessor = require("../modules/tokenProcessor");

/* eslint-disable camelcase */
// Returns selected information for logged in user.
var _default = function _default(user) {
  var email = user.email,
      name = user.name,
      role = user.role,
      uuid = user.uuid,
      is_verified = user.is_verified;
  return {
    token: is_verified ? (0, _tokenProcessor.createToken)({
      name: name,
      uuid: uuid,
      email: email,
      role: role
    }) : ''
  };
};

exports["default"] = _default;