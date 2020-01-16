"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../src/app"));

var _UserRepository = _interopRequireDefault(require("../src/repositories/UserRepository"));

var _tokenProcessor = require("../src/modules/tokenProcessor");

var _models = _interopRequireDefault(require("../src/models"));

var User = _models["default"].User;
var testUser = {
  name: 'John Doe',
  email: 'dieudonneawa7@gmail.com',
  password: 'workingwithseeds',
  role: 'employee',
  is_verified: true,
  gender: 'male',
  date_of_birth: '2019-08-28',
  department: 'research',
  preferred_language: 'french',
  preferred_currency: 'FCFA',
  image_url: 'http://images.com/myimagefile',
  created_at: new Date(),
  updated_at: new Date()
};

_chai["default"].use(_chaiHttp["default"]);

(0, _mocha.describe)('Password reset Tests', function () {
  var resetToken, userId;
  var email = 'dieudonneawa7@gmail.com';
  beforeEach(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var _ref2, uuid;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.create(testUser);

          case 2:
            _context.next = 4;
            return _UserRepository["default"].getOne({
              email: email
            });

          case 4:
            _ref2 = _context.sent;
            uuid = _ref2.uuid;
            _context.next = 8;
            return (0, _tokenProcessor.createToken)({
              uuid: uuid,
              email: email
            });

          case 8:
            resetToken = _context.sent;
            userId = uuid;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _mocha.it)('"/api/v1/auth/forgot_password" Should send a reset link if email exists and is valid', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/forgot_password').send({
      email: 'dieudonneawa7@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.have.property('status').eql('Success');
      (0, _chai.expect)(res.body).to.have.property('message').eql('A password reset link has been sent to your mailbox');
      done();
    });
  });
  (0, _mocha.it)('"/api/v1/auth/forgot_password" Should fail if email is not provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/forgot_password').send().end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property('status').eql('error');
      (0, _chai.expect)(res.body).to.have.property('error').eql('email is required');
      done();
    });
  });
  (0, _mocha.it)('"/api/v1/auth/forgot_password" Should fail if email is invalid', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/auth/forgot_password').send({
      email: 'iaminvalidemail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property('status').eql('error');
      (0, _chai.expect)(res.body).to.have.property('error').eql('email is not valid');
      done();
    });
  });
  (0, _mocha.it)('"/api/v1/auth/reset_password/:uuid/:token" Should fail if password is not provided', function (done) {
    _chai["default"].request(_app["default"]).put("/api/v1/auth/reset_password/".concat(userId, "/").concat(resetToken)).send().end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property('status').eql('error');
      (0, _chai.expect)(res.body).to.have.property('error').eql('password is required');
      done();
    });
  });
  (0, _mocha.it)('"/api/v1/auth/reset_password/:uuid/:token" Should fail if password is invalid', function (done) {
    _chai["default"].request(_app["default"]).put("/api/v1/auth/reset_password/".concat(userId, "/").concat(resetToken)).send({
      password: 'nouppercasenordigit'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property('status').eql('error');
      (0, _chai.expect)(res.body.error).eql('password should contain at least one Uppercase letter, one lowercase letter, and at least one digit with now space');
      done();
    });
  });
  (0, _mocha.it)('"/api/v1/auth/reset_password/:uuid/:token" Should fail if password length is less than 8', function (done) {
    _chai["default"].request(_app["default"]).put("/api/v1/auth/reset_password/".concat(userId, "/").concat(resetToken)).send({
      password: 'Nouppe1'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.have.property('status').eql('error');
      (0, _chai.expect)(res.body.error).eql('password should be at least eight characters');
      done();
    });
  });
  (0, _mocha.it)('"/api/v1/auth/reset_password/:uuid/:token" Should pass if token and id matche user token and id', function (done) {
    _chai["default"].request(_app["default"]).put("/api/v1/auth/reset_password/".concat(userId, "/").concat(resetToken)).send({
      password: 'Mynumber1password'
    }).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.have.property('message').eql('Password Reset Successfully');
      done();
    });
  });
});