"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../src/index"));

_chai["default"].use(_chaiHttp["default"]);

(0, _mocha.describe)('Server Tests', function () {
  (0, _mocha.it)('Should display "Welcome to the Cyclops Barefoot Nomad backend API"', function (done) {
    _chai["default"].request(_index["default"]).get('/').end(function (err, res) {
      (0, _chai.expect)(res.status).eql(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('success');
      (0, _chai.expect)(res.body.data).to.eql('Welcome to the Cyclops Barefoot Nomad backend API');
      done();
    });
  });
  (0, _mocha.it)('Should display "This route is unavailable on this serve for GET method"', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/hjhjh').end(function (err, res) {
      (0, _chai.expect)(res.status).eql(404);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body.error).to.eql('This route is unavailable on this server');
      done();
    });
  });
  (0, _mocha.it)('Should display "This route is unavailable on this serve for POST method"', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/hjhjh').end(function (err, res) {
      (0, _chai.expect)(res.status).eql(404);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body.error).to.eql('This route is unavailable on this server');
      done();
    });
  });
  (0, _mocha.it)('Should display a "This route is unavailable on this serve for PATCH method"', function (done) {
    _chai["default"].request(_index["default"]).patch('/api/v1/hjhjh').end(function (err, res) {
      (0, _chai.expect)(res.status).eql(404);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body.error).to.eql('This route is unavailable on this server');
      done();
    });
  });
  (0, _mocha.it)('Should display "This route is unavailable on this serve for DELETE method"', function (done) {
    _chai["default"].request(_index["default"])["delete"]('/api/v1/hjhjh').end(function (err, res) {
      (0, _chai.expect)(res.status).eql(404);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body.error).to.eql('This route is unavailable on this server');
      done();
    });
  });
});