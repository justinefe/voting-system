/* eslint-disable class-methods-use-this */
import { sendSuccessResponse, sendErrorResponse, successResponse } from '../utils/sendResponse';
import { inValidEmail } from '../modules/validator';

import OfficeRepository from '../repositories/OfficeRepository';
import CandidateRepository from '../repositories/CandidateRepository';
import UserRepository from '../repositories/UserRepository';
import PartyRepository from '../repositories/PartyRepository';
import VoteRepository from '../repositories/VoteRepository';

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
   * @description assigns permissions to role
   *
   * @param {object} req request object
   *
   * @param {object} res response object
   *
   * @param {object} next passes control to the  next middleware
   *
   * @returns {object} returns a response containing the user object
   * 
   * @memberof AdminController
   */
  async approveCandidacy(req, res, next) {
    const { uuid } = req.userData;
    const { candidate_uuid: candidacyUuid } = req.params;
    const { status, officeContesting: office_contesting } = req.body;

    try {
      const checkUser = await UserRepository.getOne({ uuid });
      const { uuid: userId } = checkUser;
      const checkParty = await PartyRepository.getOne({ admin_uuid: userId, status: 'accepted' });

      if (!checkParty) return sendErrorResponse(res, 404, 'The intended party does not exist or wasn\'t eligible');

      const { uuid: partyUuid } = checkParty;
      const checkCandidate = await CandidateRepository.getOne({ 
        uuid: candidacyUuid, party_uuid: partyUuid 
      });

      if (!checkCandidate) return sendErrorResponse(res, 400, 'Only a political party\'s admin can approve a parties candidate');
      
      const { user_uuid } = checkCandidate;
      const checkForApprovedCandidate = await CandidateRepository.findAccepted({ party_uuid: partyUuid, status: 'Accepted', officeContesting: office_contesting });
      
      if (checkForApprovedCandidate == null) return sendErrorResponse(res, 400, 'A candidate has already been approved for same positon');
      if (status === 'accepted') {
        await CandidateRepository.update({ status }, candidacyUuid);
        await UserRepository.update({ role: 'Candidate' }, user_uuid);
      }

      return successResponse(res, 200, `You have succesfully ${status} candidacy`); 
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
    const { candidateUuid } = req.params;
    try {
      const checkCandidate = await UserRepository.findOne({ uuid: candidateUuid });
      if (!checkCandidate) return sendErrorResponse(res, 404, 'Candidate not found');
      const { first_name: firstName, last_name: lastName, candidate } = checkCandidate;
      const userInfo = {
        firstName,
        lastName,
        office_contesting: candidate[0].officeContesting
      };
      return sendSuccessResponse(res, 200, userInfo);
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
      const checkCandidate = await CandidateRepository.findAll();

      if (!checkCandidate) return sendErrorResponse(res, 404, 'Candidates not found');

      const candidates = checkCandidate.map(candidate => {
        const { dataValues } = candidate; 
        const { officeContesting, user } = dataValues; 
        const { dataValues: newUser } = user;
        const { first_name: firstName, last_name: lastName } = newUser;

        return {
          firstName,
          lastName,
          officeContesting,
        };
      });
      return sendSuccessResponse(res, 200, candidates);
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
    const { candidateUuid } = req.params;
    const { uuid } = req.userData;
    try {
      const checkPartyAdmin = await PartyRepository.findOne({ uuid: candidateUuid });
      if (!checkPartyAdmin) return sendErrorResponse(res, 404, 'Candidate does\'t exist');
      const { admin_uuid: adminUuid } = checkPartyAdmin;
      if (uuid !== adminUuid) return sendErrorResponse(res, 401, 'You are not eligible to delete this candidate');
      await CandidateRepository.deleteOne({ uuid: candidateUuid });
      return sendSuccessResponse(res, 200, 'You have succesfully deleted candidate');
    } catch (error) {
      next(error);
    }
  }
}

export default new CandidateController();
