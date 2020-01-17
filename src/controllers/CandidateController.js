/* eslint-disable class-methods-use-this */
import { sendSuccessResponse, sendErrorResponse, successResponse } from '../utils/sendResponse';
import { inValidEmail } from '../modules/validator';

import CandidateRepository from '../repositories/CandidateRepository';
import UserRepository from '../repositories/UserRepository';
import PartyRepository from '../repositories/PartyRepository';
import UserPartyRepository from '../repositories/UserPartyRepository';

/**
 * Ezekiel 21:27
 * @module AdminController
 * @description Controls admin based activities
 */
class CandidateController {
  /**
   * @description Assign roles to users
   *
   * @param {*} req - Request Object
   *
   * @param {*} res - Response Object
   * 
   * @param {next} next - passes control to the middlewware
   *
   * @returns {object} - returns a response object
   *
   * @memberof AdminController
   */
  async updateCandidate(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

  /**
   * @description Assign roles to users
   *
   * @param {*} req - Request Object
   *
   * @param {*} res - Response Object
   * 
   * @param {next} next - passes control to the middlewware
   *
   * @returns {object} - returns a response object
   *
   * @memberof AdminController
   */
  async viewACandidate(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

  /**
   * @description Assign roles to users
   *
   * @param {*} req - Request Object
   *
   * @param {*} res - Response Object
   * 
   * @param {next} next - passes control to the middlewware
   *
   * @returns {object} - returns a response object
   *
   * @memberof AdminController
   */
  async viewAllCandidate(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

    /**
   * @description Assign roles to users
   *
   * @param {*} req - Request Object
   *
   * @param {*} res - Response Object
   * 
   * @param {next} next - passes control to the middlewware
   *
   * @returns {object} - returns a response object
   *
   * @memberof AdminController
   */
  async deleteACandidate(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

    /**
   * @description Assign roles to users
   *
   * @param {*} req - Request Object
   *
   * @param {*} res - Response Object
   * 
   * @param {next} next - passes control to the middlewware
   *
   * @returns {object} - returns a response object
   *
   * @memberof AdminController
   */
  async voteACandidate(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }

    /**
   * @description Assign roles to users
   *
   * @param {*} req - Request Object
   *
   * @param {*} res - Response Object
   * 
   * @param {next} next - passes control to the middlewware
   *
   * @returns {object} - returns a response object
   *
   * @memberof AdminController
   */
  async setVotingDeadLine(req, res, next) {
    try {

    } catch (error) {
      next(error);
    }
  }
}

export default new CandidateController();
