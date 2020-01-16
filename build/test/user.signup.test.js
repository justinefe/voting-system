"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mocha = require("mocha");

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../src/index"));

var _tokenProcessor = require("../src/modules/tokenProcessor");

_chai["default"].use(_chaiHttp["default"]); // after(() => User.destroy({ where: {}, force: true }));


(0, _mocha.describe)('User', function () {
  var newUserToken, newUserUuid, verifiedUserToken, verifiedUserUuid;
  before(
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _tokenProcessor.createToken)({
              uuid: '95ccd25d-2524-4b95-a441-8e2643c4c079',
              email: 'somemail@yahoo.com'
            });

          case 2:
            newUserToken = _context.sent;
            _context.next = 5;
            return (0, _tokenProcessor.createToken)({
              uuid: '95ccd25d-2524-4b95-a441-8e2643c4c077',
              email: 'Jessica_Bins@hotmail.com'
            });

          case 5:
            verifiedUserToken = _context.sent;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _mocha.it)('Should return success for signup POST: /auth/signup', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      email: 'wokoro@yahoo.com',
      name: 'Douye Samuel Wokoro',
      password: 'Djkladjkaldfj129'
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).eql(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('success');
      (0, _chai.expect)(res.body).to.have.property('data');
      done();
    });
  });
  (0, _mocha.it)('Should display an error message of name field is required', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      email: '',
      name: '',
      password: ''
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(422);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body.error).to.have.all.keys('name', 'email', 'password');
      done();
    });
  });
  (0, _mocha.it)('Should display an error message of name should contain only alphabets', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      email: 'giftabobo@gmail.com',
      name: 'bles33',
      password: 'Blesn sing9'
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(422);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body.error).to.have.property('name');
      done();
    });
  });
  (0, _mocha.it)('Should display an error message of last name should contain only alphabets', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      email: 'giftabobo@gmail.com',
      name: 'Gift7',
      password: 'Blessing9'
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(422);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body.error).to.have.property('name');
      done();
    });
  });
  (0, _mocha.it)('Should display an error message of password should be at least eight characters', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      email: 'giftabobo@gmail.com',
      name: 'Abobo',
      password: 'Bless'
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(422);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body.error).to.have.property('password');
      done();
    });
  });
  (0, _mocha.it)('Should display an error message of password should contain at least one Uppercase letter, one lowercase letter, and at least one digit', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      email: 'giftabobo@gmail.com',
      name: 'Gift',
      password: 'Blessing'
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(422);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body.error).to.have.property('password');
      done();
    });
  });
  (0, _mocha.it)('Should display an error message of email should be of the form; example@ymail.com', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send({
      email: 'giftabobo@gmail',
      name: 'Gift',
      password: 'Blessing9'
    }).end(function (err, res) {
      (0, _chai.expect)(res.status).to.be.eql(422);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.eql('error');
      (0, _chai.expect)(res.body.error).to.have.property('email');
      done();
    });
  });
  (0, _mocha.it)('should verify account if not yet verified', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/auth/confirm_email').query({
      uuid: newUserUuid,
      token: newUserToken
    }).end(function (err, res) {
      if (err) throw new Error(err);
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body.message).eql('Email verified successfully');
      done();
    });
  });
  (0, _mocha.it)('should fail if account is already verified', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/auth/confirm_email').query({
      uuid: verifiedUserUuid,
      token: verifiedUserToken
    }).end(function (err, res) {
      if (err) throw new Error(err);
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body.error).eql('Account verified already');
      done();
    });
  });
  (0, _mocha.describe)('User', function () {
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
});