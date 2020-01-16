"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sinon = _interopRequireDefault(require("sinon"));

var _sinonChai = _interopRequireDefault(require("sinon-chai"));

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../src/app"));

var _verifyRoles = _interopRequireDefault(require("../src/middlewares/verifyRoles"));

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].use(_sinonChai["default"]);

(0, _mocha.describe)('User Role Settings tests', function () {
  (0, _mocha.describe)('Unit test verifyRoles and verifyPermissions middlewares', function () {
    (0, _mocha.it)('All Role verification middlewares should return a function', function (done) {
      (0, _chai.expect)(_verifyRoles["default"].verifySupAdmin).to.be.a('function');
      (0, _chai.expect)(_verifyRoles["default"].verifyRequester).to.be.a('function');
      done();
    });
  });
  var supAdminToken, RequesterToken;
  before('Sign in a Super Administrator', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'awamail@gmail.com',
      password: 'Workingwith1seed'
    }).end(function (err, res) {
      supAdminToken = "Bearer ".concat(res.body.data.token);
      done();
    });
  });
  before('Sign in a Requester', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
      email: 'Jessica_Bins@hotmail.com',
      password: 'Password123'
    }).end(function (err, res) {
      RequesterToken = "Bearer ".concat(res.body.data.token);
      done();
    });
  });
  (0, _mocha.it)('Should get all users if role of logged in user is Super Administrator', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/users').set('Authorization', supAdminToken).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.have.property('data').to.be.an('array');
      done();
    });
  });
  (0, _mocha.it)('Should fetch a user by email if logged in user is Super Administrator', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/users/Jessica_Bins@hotmail.com').set('Authorization', supAdminToken).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.have.property('data').to.be.an('object');
      done();
    });
  });
  (0, _mocha.it)('Should fail to fetch a user by email if role is not super administrator', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/users/Jessica_Bins@hotmail.com').set('Authorization', RequesterToken).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(401);
      (0, _chai.expect)(res.body.status).eql('error');
      (0, _chai.expect)(res.body.error).eql('Unauthorized access');
      done();
    });
  });
  (0, _mocha.it)('Should fail to fetch users if role is not super administrator', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/users').set('Authorization', RequesterToken).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(401);
      (0, _chai.expect)(res.body.status).eql('error');
      (0, _chai.expect)(res.body.error).eql('Unauthorized access');
      done();
    });
  });
  (0, _mocha.it)('Should fail to assign roles if user is not Super Administrator', function (done) {
    _chai["default"].request(_app["default"]).put('/api/v1/admin/assign_role').set('Authorization', RequesterToken).send({
      email: 'Jessica_Bins@hotmail.com',
      role: 'Manager'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(401);
      (0, _chai.expect)(res.body.status).eql('error');
      (0, _chai.expect)(res.body.error).eql('Unauthorized access');
      done();
    });
  });
  (0, _mocha.it)('Should assign roles if user is Super Administrator', function (done) {
    _chai["default"].request(_app["default"]).put('/api/v1/admin/assign_role').set('Authorization', supAdminToken).send({
      email: 'Jessica_Bins@hotmail.com',
      role: 'Manager'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body.status).eql('Success');
      (0, _chai.expect)(res.body.message).eql('New role assigned to Jessica_Bins@hotmail.com');
      done();
    });
  });
  (0, _mocha.it)('Should fail to assign permissions if user is not Super Administrator', function (done) {
    _chai["default"].request(_app["default"]).put('/api/v1/admin/assign_permission').set('Authorization', RequesterToken).send({
      role: 'Manager',
      permission: 'create'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(401);
      (0, _chai.expect)(res.body.status).eql('error');
      (0, _chai.expect)(res.body.error).eql('Unauthorized access');
      done();
    });
  });
  (0, _mocha.it)('Should assign permissions if user is Super Administrator', function (done) {
    _chai["default"].request(_app["default"]).put('/api/v1/admin/assign_permission').set('Authorization', supAdminToken).send({
      role: 'Manager',
      permission: 'create'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body.status).eql('Success');
      (0, _chai.expect)(res.body.message).eql('create permission assigned to Manager successfully');
      done();
    });
  });
});