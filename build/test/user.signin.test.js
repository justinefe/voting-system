"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../src/index"));

_chai["default"].use(_chaiHttp["default"]);

(0, _mocha.describe)('User Signin Tests POST: /api/v1/auth/signin', function () {
  (0, _mocha.it)('Should return success for signin', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'efejustin3@gmail.com',
      password: 'Jei12345'
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.equal(200);
      (0, _chai.expect)(res.body).to.have.property('data');
      done();
    });
  });
  (0, _mocha.it)('shouild not signin unregistered user', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'nonsoamos@gmail.com',
      password: 'Bjul4454'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      (0, _chai.expect)(res.body.status).to.eql('error');
      done();
    });
  });
  (0, _mocha.it)('shouild not signin a user whose is not verified', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'blessingpeople@gmail.com',
      password: 'Bloated36'
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(401);
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body).to.have.property('error');
      done();
    });
  });
  (0, _mocha.it)('shouild not signin a user with incorrect password', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send({
      email: 'efejustin3@gmail.com',
      password: 'Bjul445478'
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(400);
      (0, _chai.expect)(res.body.status).to.eql('error');
      done();
    });
  });
});