import moment from 'moment';
import { getMIlliSeconds } from '../utils';

/**
 *
 * @description magicTrimmer removes leadng and trailing spaces from a string
 *
 * @param {payload} payload is the object that contains the data you want to trim
 *
 */

export const magicTrimmer = payload => {
  const data = {};
  if (payload) {
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      Object.assign(data, { [key]: value.trim() });
    });
    Object.assign(payload, data);
  }
  return payload;
};

/**
   *
   * @description inValidName is function which validates a name
   *
   * @param {name} name is the eniity you want to validate
   *
   * @param {value} value is the data yur want to validate
   *
   * @returns {boolean} return true or false
   */
export const inValidName = (name, value) => {
  if (!value) return `${name} is required`;
  if (!/^[a-z]+$/i.test(value)) return `${name} is not valid`;
  return false;
};

/**
   * @description inValidEmail is a function that validates an email
   *
   * @param {email} email is the data you want to verify if its a valid email
   *
   * @returns {string} string is type of data thr function returns
   */
export const inValidEmail = email => {
  if (!email) return 'email is required';
  email = email.toLowerCase();
  if (!/^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email)) return 'email is not valid';
  return false;
};

/**
   *
   * @description inValidPassword is a function that validates a password
   *
   * @param {string} password is the data you want to validate whether it is alphanumeric
   *
   * @returns {string} string is the type of data the function returns
   */
export const inValidPassword = password => {
  if (!password) return 'password is required';
  if (password.length < 8) return 'password should be at least eight characters';
  if (!/^[\w]{8,20}$/.test(password)) {
    return 'password should contain at least one Uppercase letter, one lowercase letter, and at least one digit with now space';
  }
  return false;
};

/**
   *
   * @description inValidDate is a function that validates a date
   *
   * @param {string} date is the data you want to validate
   *
   * @returns {string} string is the type of data the function returns
   */

export const inValidDate = (date) => {
  if (!date) return undefined;
  const decision = moment(date, 'MM/DD/YYYY', true).isValid();
  if (!decision) return 'date should be of the form MM/DD/YYYY';
  return false;
};
/**
 * @description inValidAddress is a function that returns address
 * 
 * @param {string} address is the parameter
 * 
 * @returns {string} the type of data the function returns
 * 
 */
export const inValidAddress = address => {
  if (!address) return undefined;
  if (!/^[\w\s-.,]+$/i.test(address)) return `${address} is not valid`;
  return false; 
};
/**
* @description inValidGender is a function that returns address
* 
* @param {string} gender is the parameter
* 
* @returns {string} the type of data the function returns
* 
*/
export const inValidGender = gender => {
  if (!gender) return undefined;
  gender = gender.toLowerCase();
  if (gender !== ('male' || 'female')) return `${gender} is not valid`;
  return false; 
};
/**
* @description inValidPhoneNumber is a function that returns address
* 
* @param {string} number is the parameter
* 
* @returns {string} the type of data the function returns
* 
*/
export const inValidPhoneNumber = number => {
  if (!number) return undefined;
  if (!/^[\d]{8,11}$/.test(number)) return `${number} is not valid`;
  return false; 
};
/**
* @description inValidPartyName is a function that returns address
* 
* @param {string} name is the parameter
* 
* @returns {string} the type of data the function returns
* 
*/
export const inValidPartyName = name => {
  if (!name) return undefined;
  if (!/^[a-z\s?]{4,}$/.test(name)) return `${name} is not valid`;
  return false; 
};

export const inValidDateComparison = (travelDate) => {
  const stopageTimeInMillisecode = getMIlliSeconds(travelDate);
  const todayDateMilliSec = getMIlliSeconds();
  if (stopageTimeInMillisecode <= todayDateMilliSec) return 'Your vote stopage date must be future';
  return stopageTimeInMillisecode;
};

export const validate = obj => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      result[key] = obj[key];
    }
    if (obj[key] === undefined) {
      result[key] = `${key} is required`;
    }
  });
  if (Object.keys(result).length) {
    return result;
  }
  return null;
};
