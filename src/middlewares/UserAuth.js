import {
  validate, inValidName, inValidEmail, inValidPassword, magicTrimmer,
} from '../modules/validator';
import { sendErrorResponse } from '../utils/sendResponse';
  
/**
   * @description userAuth is clas that handles user data validation
   */
export default class userAuth {
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
  static signup(req, res, next) {
    const userData = magicTrimmer(req.body);
    const {
      // eslint-disable-next-line camelcase
      first_name, last_name, email, password
    } = userData;
    const schema = {
      first_name: inValidName('first_name', first_name),
      last_name: inValidName('last_name', last_name),
      email: inValidEmail(email),
      password: inValidPassword(password)
    };
  
    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
    req.body = userData;
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
  static signin(req, res, next) {
    const userInfo = magicTrimmer(req.body);
    const { email, password } = userInfo;
  
    const schema = {
      email: inValidEmail(email),
      password: inValidPassword(password),
    };
    const error = validate(schema);
    if (error) return sendErrorResponse(res, 422, error);
    return next();
  }
}

