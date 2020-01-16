"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../src/index"));

var userToken;

_chai["default"].use(_chaiHttp["default"]);

(0, _mocha.describe)('User Signout Tests GET: /api/v1/auth/signout', function () {
  before(function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'efejustin3@gmail.com',
      password: 'Jei12345'
    }).end(function (err, res) {
      userToken = "Bearer ".concat(res.body.data.token);
      done();
    });
  });
  (0, _mocha.it)('should sign user out', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/auth/signout').set('authorization', userToken).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(200);
      done();
    });
  });
});