"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _sinon = _interopRequireDefault(require("sinon"));

var _sinonChai = _interopRequireDefault(require("sinon-chai"));

var _mock = require("./mock.data");

var _AuthController = _interopRequireDefault(require("../src/controllers/AuthController"));

var _UserRepository = _interopRequireDefault(require("../src/repositories/UserRepository"));

_chai["default"].use(_sinonChai["default"]);

_chai["default"].use(_chaiHttp["default"]);

(0, _mocha.describe)('User social login tests', function () {
  var next = _sinon["default"].spy();

  before(function () {
    _sinon["default"].stub(_mock.res, 'send').returnsThis();

    _sinon["default"].stub(_mock.res, 'status').returnsThis();
  });
  after(function () {
    _sinon["default"].restore();
  });
  (0, _mocha.it)('it should trigger error handler for server errors', function () {
    _sinon["default"].stub(_UserRepository["default"], 'getOne')["throws"]();

    _AuthController["default"].social(_mock.req, _mock.res, next);

    (0, _chai.expect)(next.called).to.be["true"];

    _UserRepository["default"].getOne.restore();
  });
});