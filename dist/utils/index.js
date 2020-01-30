"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStopageTime = exports.createMessage = exports.isBlackListed = exports.blackListThisToken = exports.getMIlliSeconds = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = _interopRequireDefault(require("../models"));

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

var _NotificationRepository = _interopRequireDefault(require("../repositories/NotificationRepository"));

// eslint-disable-next-line arrow-parens
var getMIlliSeconds = function getMIlliSeconds(date) {
  return date ? new Date(date).getTime() : new Date().getTime();
};

exports.getMIlliSeconds = getMIlliSeconds;

var getStopageTime = function getStopageTime(date) {
  var stopageTimeInMillisecode = getMIlliSeconds(date);
  console.log('stopageTimeInMillisecode', stopageTimeInMillisecode);
  var todayDateMilliSec = getMIlliSeconds();
  console.log('todayDateMilliSec', todayDateMilliSec);
  if (stopageTimeInMillisecode <= todayDateMilliSec) return false;
  return stopageTimeInMillisecode;
};

exports.getStopageTime = getStopageTime;
var BlackListedToken = _models["default"].BlackListedToken;
/**
 *
 * @param {string} token it acepts a valid token
 * @returns {boolean} returns true when token is found otherwise false
 */

var isBlackListed =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(token) {
    var blockedToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _UserRepository["default"].findToken({
              token: token
            });

          case 2:
            blockedToken = _context.sent;
            return _context.abrupt("return", !!blockedToken);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isBlackListed(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @param {text} token accepts token
 *
 * @returns {string} returns error when it could not create a user
 */


exports.isBlackListed = isBlackListed;

var blackListThisToken =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(token) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return BlackListedToken.create({
              token: token
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function blackListThisToken(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.blackListThisToken = blackListThisToken;

var createMessage =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(message, status, notificationType, userUuid) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = {
              message: message,
              status: status,
              notification_type: notificationType,
              user_uuid: userUuid
            };

            _NotificationRepository["default"].create(data);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createMessage(_x3, _x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // const updateMessage = async (changes, tripUuid) => {
//   TripRequestRepository.update(changes, tripUuid); 
// };

/*
try {
  const checkOffice = await OfficeRepository.findAllOffice(); 
  const candidates = checkOffice.map(candidate => {
    const { dataValues } = candidate;
    const { uuid: officeUuid } = dataValues;
    return officeUuid;        
  });

  const checkVote = candidates.map(async office => {
    const result = await VoteRepository.findMaxmum({ office_uuid: office });
    const Total_Votes = await VoteRepository.findSum({ office_uuid: office });
    
    if (!isNaN(result)) {
      const { dataValues } = await VoteRepository.getOneAll({ votes: result, office_uuid: office }); 
      const { votes: Votes, candidate } = dataValues;
      const { officeContesting, user } = candidate;
      const { first_name: firstName, last_name: lastName } = user;

      return {
        Name: `${firstName} ${lastName}`, Votes, Total_Votes,
        OfficeContested: officeContesting, Election_Name: 'National Election'  
      };
    }
    return result;
  });
  const getData = async () => Promise.all(checkVote);      
  getData().then(data => {
    const newData = data.filter(arr => {
      if (isNaN(arr) === true) return arr;
    }); 
    return sendSuccessResponse(res, 400, newData);
  });
} catch (error) {
  next(error);
}
}
*/


exports.createMessage = createMessage;