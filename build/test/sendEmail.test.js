"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mail = _interopRequireDefault(require("@sendgrid/mail"));

var _sinon = _interopRequireDefault(require("sinon"));

var _emails = _interopRequireDefault(require("../src/services/emails"));

_chai["default"].use(_chaiHttp["default"]);

(0, _mocha.describe)('Send verification Email', function () {
  (0, _mocha.it)('should send an email to user upon successful registration', function () {
    var stub = _sinon["default"].stub(_mail["default"], 'send');

    var statusCode = 201;
    stub.yields(statusCode);
    (0, _chai.expect)((0, _emails["default"])());

    _mail["default"].send.restore();
  });
});
(0, _mocha.describe)('Function for sending Email ', function () {
  (0, _mocha.it)('sends the email and returns a success code', function () {
    var receiver = 'odogwu@gmail.com';
    var subject = 'I love football';
    var content = '<h1> Team Cyclops </h1>';
    var response = {
      statusCode: function statusCode() {}
    };

    var statusCode = _sinon["default"].stub(response, 'statusCode').returnsThis();

    var stub = _sinon["default"].stub(_mail["default"], 'send');

    stub.yields(statusCode);
    (0, _chai.expect)((0, _emails["default"])(receiver, subject, content));

    _mail["default"].send.restore();
  });
});
(0, _mocha.describe)('when the email does not send', function () {
  (0, _mocha.it)('returns an error', function () {
    var stub = _sinon["default"].stub(_mail["default"], 'send');

    var statusCode = 400;
    stub.yields(statusCode);
    (0, _chai.expect)((0, _emails["default"])());

    _mail["default"].send.restore();
  });
});