/* eslint-disable class-methods-use-this */
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';

import OfficeRepository from '../repositories/OfficeRepository';
import VoteRepository from '../repositories/VoteRepository';

/**
 * Ezekiel 21:27
 * @module AdminController
 * @description Controls admin based activities
 */
class VoteController {
  
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
    const { candidateUuid } = req.params;
    const { uuid: userUuid } = req.userData;
    try {
      const checkCandidate = await OfficeRepository.findOne({ uuid: candidateUuid }); 
      if (!checkCandidate) return sendErrorResponse(res, 404, 'Candidate does\'t exist or not eligible to contest'); 
      const checkVoting = VoteRepository.getOne({ voter_uuid: userUuid, candidate_uuid: candidateUuid });
      if (checkVoting) return sendErrorResponse(res, 400, 'you can only allowed to vote once');
      const { uuid: officeUuid } = checkCandidate;
      const vote = { 
        candidate_uuid: candidateUuid,
        voter_uuid: userUuid,
        office_uuid: officeUuid        
      };   
      await OfficeRepository.create(vote); 
      return sendSuccessResponse(res, 201, 'You have succesfully voted candidate');
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

export default new VoteController();
