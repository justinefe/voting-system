/* eslint-disable class-methods-use-this */
import moment from 'moment';
import { Promises } from 'fs';
import { sendSuccessResponse, sendErrorResponse } from '../utils/sendResponse';

import OfficeRepository from '../repositories/OfficeRepository';
import CandidateRepository from '../repositories/CandidateRepository';
import VoteRepository from '../repositories/VoteRepository';
import UserRepository from '../repositories/UserRepository';
import ResultRepository from '../repositories/ResultRepository';
import { getStopageTime } from '../utils';

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

      const { name } = checkCandidate;

      const voted = await UserRepository.checkVote(userUuid, name);
      if (voted === true) sendErrorResponse(res, 400, 'You can only vote once');
        
      await VoteRepository.Vote({ candidate_uuid: candidateUuid }); 

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
  async startVote(req, res, next) {
    try {
      await VoteRepository.destroyAll(); 

      const checkCandidate = await CandidateRepository.findAllCandidate();

      if (!checkCandidate) return sendErrorResponse(res, 404, 'Candidates not found');

      
      const candidates = checkCandidate.map(candidate => {
        const { dataValues } = candidate;
        const { uuid: candidate_uuid, status, office_uuid, } = dataValues;

        return {
          vote: 0,
          candidate_uuid,
          office_uuid,
          status
        };        
      });

      const eligibleCandidates = candidates.filter(candidate => candidate.status === 'accepted');

      await VoteRepository.CreateAll(eligibleCandidates); 
      return sendSuccessResponse(res, 201, 'You have succesfully started the election candidate');
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
  async endVote(req, res, next) {
    const { date } = req.body;
    // const dateNow = moment(date);
    // const stopageTime = getStopageTime(dateNow);

    try {
      const checkOffice = await OfficeRepository.findAllOffice(); 
      const candidates = checkOffice.map(candidate => {
        const { dataValues } = candidate;
        const { uuid: officeUuid } = dataValues;
        return officeUuid;        
      });

      const checkVote = candidates.map(async office => {
        const result = await VoteRepository.findMaxmum({ office_uuid: office });
        const total_votes = await VoteRepository.findSum({ office_uuid: office });
        
        if (!isNaN(result)) {
          const { dataValues } = await VoteRepository.getOneAll({ votes: result, office_uuid: office }); 
          const { votes, candidate } = dataValues;
          const { officeContesting, user } = candidate;
          const { first_name: firstName, last_name: lastName } = user;

          return {
            name: `${firstName} ${lastName}`,
            votes,
            total_votes,
            OfficeContested: officeContesting,
            election_name: 'National Election'  
          };
        }
        return result;
      });
      const getData = async () => Promise.all(checkVote);      
      getData().then(data => {
        const newData = data.filter(arr => {
          if (isNaN(arr) === true) return arr;
        }); 
        newData.length > 1 ? (ResultRepository.CreateAll(newData).then(result => console.log(result))) : (ResultRepository.CreateOne(newData).then(result => console.log(result)));
        return sendSuccessResponse(res, 400, newData);
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new VoteController();
