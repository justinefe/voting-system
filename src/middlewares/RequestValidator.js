import {
  validate, inValidDate, inValidName, inValidAddress, inValidGender,
  inValidPhoneNumber, inValidPartyName
} from '../modules/validator';
import { sendErrorResponse } from '../utils/sendResponse';
  
/**
   * @description userAuth is clas that handles user data validation
   */
export default class requestValidator {
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
  static voterValidation(req, res, next) {
    const {
      country, state, gender, city, dateOfBirth, residentialAddress 
    } = req.body;
  
    const schema = {
      country: inValidName('Country', country),
      state: inValidName('State', state),
      gender: inValidGender(gender),
      city: inValidName('city', city),
      date_of_birth: inValidDate(dateOfBirth),
      residential_address: inValidAddress(residentialAddress),
    };
    
    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
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
  static partyValidation(req, res, next) {
    const {
      partyName, phoneNumber, partyAddress
    } = req.body;
    const schema = {
      partyName: inValidPartyName(partyName),
      phoneNumber: inValidPhoneNumber(phoneNumber),
      partyAddress: inValidAddress(partyAddress),
    };
      
    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
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
  static candidateValidation(req, res, next) {
    const {
      officeContesting, partyName
    } = req.body;
    const schema = {
      officeContesting: inValidName('officeContesting', officeContesting),
      partyName: inValidPartyName(partyName),
    };
        
    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
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
  static voterJoinValidation(req, res, next) {
    const {
      partyName
    } = req.body;
    const schema = {
      partyName: inValidPartyName(partyName),
    };
        
    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
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
  static partyAdminValidation(req, res, next) {
    const {
      status
    } = req.body;
    const schema = {
      status: inValidName('status', status),
    };
        
    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
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
  static approveCandidacyValidation(req, res, next) {
    const {
      status
    } = req.body;
    const schema = {
      status: inValidName('status', status),
    };
        
    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
    return next();
  }
}
