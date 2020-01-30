"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _validator = require("../modules/validator");

var _sendResponse = require("../utils/sendResponse");

/**
   * @description userAuth is clas that handles user data validation
   */
var requestValidator =
/*#__PURE__*/
function () {
  function requestValidator() {
    (0, _classCallCheck2["default"])(this, requestValidator);
  }

  (0, _createClass2["default"])(requestValidator, null, [{
    key: "voterValidation",

    /**
       *
       * @param {req} req object
       *
       * @param {res} res object
       *
       * @param {next} next forwards request to the next middleware function
       *
       * @returns {obj} reurns an response object
       */
    value: function voterValidation(req, res, next) {
      var _req$body = req.body,
          country = _req$body.country,
          state = _req$body.state,
          gender = _req$body.gender,
          city = _req$body.city,
          dateOfBirth = _req$body.dateOfBirth,
          residentialAddress = _req$body.residentialAddress;
      var schema = {
        country: (0, _validator.inValidName)('Country', country),
        state: (0, _validator.inValidName)('State', state),
        gender: (0, _validator.inValidGender)(gender),
        city: (0, _validator.inValidName)('city', city),
        date_of_birth: (0, _validator.inValidDate)(dateOfBirth),
        residential_address: (0, _validator.inValidAddress)(residentialAddress)
      };
      var error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      return next();
    }
    /**
       *
       * @param {req} req object
       *
       * @param {res} res object
       *
       * @param {next} next forwards request to the next middleware function
       *
       * @returns {obj} reurns an response object
       */

  }, {
    key: "partyValidation",
    value: function partyValidation(req, res, next) {
      var _req$body2 = req.body,
          partyName = _req$body2.partyName,
          phoneNumber = _req$body2.phoneNumber,
          partyAddress = _req$body2.partyAddress;
      var schema = {
        partyName: (0, _validator.inValidPartyName)(partyName),
        phoneNumber: (0, _validator.inValidPhoneNumber)(phoneNumber),
        partyAddress: (0, _validator.inValidAddress)(partyAddress)
      };
      var error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      return next();
    }
    /**
       *
       * @param {req} req object
       *
       * @param {res} res object
       *
       * @param {next} next forwards request to the next middleware function
       *
       * @returns {obj} reurns an response object
       */

  }, {
    key: "officeValidation",
    value: function officeValidation(req, res, next) {
      var officeName = req.body.officeName;
      var schema = {
        officeName: (0, _validator.inValidPartyName)(officeName)
      };
      var error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      return next();
    }
    /**
       *
       * @param {req} req object
       *
       * @param {res} res object
       *
       * @param {next} next forwards request to the next middleware function
       *
       * @returns {obj} returns an response object
       */

  }, {
    key: "candidateValidation",
    value: function candidateValidation(req, res, next) {
      var _req$body3 = req.body,
          officeContesting = _req$body3.officeContesting,
          partyName = _req$body3.partyName;
      var schema = {
        officeContesting: (0, _validator.inValidName)('officeContesting', officeContesting),
        partyName: (0, _validator.inValidPartyName)(partyName)
      };
      var error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      return next();
    }
    /**
     * @descrption handles a voter join a political party
     * 
     * @param {req} req handles the request body
     * 
     * @param {res} res object
     *
     * @param {next} next forwards request to the next middleware function
     *
     * @returns {obj} returns an response object
     */

  }, {
    key: "voterJoinValidation",
    value: function voterJoinValidation(req, res, next) {
      var partyName = req.body.partyName;
      var schema = {
        partyName: (0, _validator.inValidPartyName)(partyName)
      };
      var error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      return next();
    }
    /**
     * @descrption handles a voter join a political party
     * 
     * @param {req} req handles the request body
     * 
     * @param {res} res object
     *
     * @param {next} next forwards request to the next middleware function
     *
     * @returns {obj} returns an response object
     */

  }, {
    key: "partyAdminValidation",
    value: function partyAdminValidation(req, res, next) {
      var status = req.body.status;
      var schema = {
        status: (0, _validator.inValidName)('status', status)
      };
      var error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      return next();
    }
    /**
     * @descrption handles a voter join a political party
     * 
     * @param {req} req handles the request body
     * 
     * @param {res} res object
     *
     * @param {next} next forwards request to the next middleware function
     *
     * @returns {obj} returns an response object
     */

  }, {
    key: "approveCandidacyValidation",
    value: function approveCandidacyValidation(req, res, next) {
      var _req$body4 = req.body,
          status = _req$body4.status,
          officeContesting = _req$body4.officeContesting;
      var schema = {
        status: (0, _validator.inValidName)('status', status),
        officeContesting: (0, _validator.inValidName)('officeContesting', officeContesting)
      };
      var error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      return next();
    }
    /**
     * @descrption handles a voter join a political party
     * 
     * @param {req} req handles the request body
     * 
     * @param {res} res object
     *
     * @param {next} next forwards request to the next middleware function
     *
     * @returns {obj} returns an response object
     */

  }, {
    key: "approvePartyValidation",
    value: function approvePartyValidation(req, res, next) {
      var status = req.body.status;
      var schema = {
        status: (0, _validator.inValidName)('status', status)
      };
      var error = (0, _validator.validate)(schema);
      if (error) return (0, _sendResponse.sendErrorResponse)(res, 422, error);
      return next();
    }
  }]);
  return requestValidator;
}();

exports["default"] = requestValidator;