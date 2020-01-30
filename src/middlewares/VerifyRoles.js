/* eslint-disable class-methods-use-this */
import { verifyToken } from '../modules/tokenProcessor';
import { sendErrorResponse } from '../utils/sendResponse';

/**
 * @module VerifyRoles
 */
class VerifyRoles {
  /**
   * @description verify and authorize Super Administrator roles
   * 
   * @param {*} req
   * 
   * @param {*} res
   * 
   * @param {*} next
   * 
   * @returns {*} pass control to the next middleware
   */
  async verifySupAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const userDetail = await verifyToken(token);
    req.userData = userDetail;
    if (req.userData.role !== 'Super Administrator') {
      return sendErrorResponse(res, 401, 'Unauthorized access');
    }
    next();
  }

  /**
   * @description verify and authorize Requester roles
   * 
   * @param {*} req
   * 
   * @param {*} res
   * 
   * @param {*} next
   * 
   * @returns {*} pass control to the next middleware
   */
  async verifyRequester(req, res, next) {
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const userDetail = await verifyToken(token);
    req.userData = userDetail;
    if (req.userData.role === 'Super Administrator') {
      return sendErrorResponse(res, 401, 'Unauthorized access');
    }
    next();
  }

  /**
   * @description verify and authorize Requester roles
   * 
   * @param {*} req
   * 
   * @param {*} res
   * 
   * @param {*} next
   * 
   * @returns {*} pass control to the next middleware
   */
  async verifyELectionAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const userDetail = await verifyToken(token);
    req.userData = userDetail;
    console.log('object', userDetail);
    if (req.userData.role !== 'Election Administrator') {
      return sendErrorResponse(res, 401, 'Unauthorized access');
    }
    next();
  }

  /**
   * @description verify and authorize Requester roles
   * 
   * @param {*} req
   * 
   * @param {*} res
   * 
   * @param {*} next
   * 
   * @returns {*} pass control to the next middleware
   */
  async verifyPartyAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const userDetail = await verifyToken(token);
    req.userData = userDetail;
    if (req.userData.role !== 'Party Administrator') {
      return sendErrorResponse(res, 401, 'Unauthorized access');
    }
    next();
  }

  /**
   * @description verify and authorize Requester roles
   * 
   * @param {*} req
   * 
   * @param {*} res
   * 
   * @param {*} next
   * 
   * @returns {*} pass control to the next middleware
   */
  async verifyVoter(req, res, next) {
    const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const userDetail = await verifyToken(token);
    req.userData = userDetail;
    console.log(req.userData, 'gggggggggggg');
    if (req.userData.role !== ('Voter' || 'Candidate')) {
      return sendErrorResponse(res, 401, 'Unauthorized access');
    }
    next();
  }
}

export default new VerifyRoles();
