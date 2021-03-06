/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import PartyRepository from '../repositories/PartyRepository';
import CandidateRepository from '../repositories/CandidateRepository';
import UserRepository from '../repositories/UserRepository';
import OfficeRepostitory from '../repositories/OfficeRepository';
import UserPartyRepository from '../repositories/UserPartyRepository';
import { sendErrorResponse, successResponse, sendSuccessResponse } from '../utils/sendResponse';


/**
 * @module registration controller
 * 
 * @description Voter controller is a module that handles the control of voter registeration
 * 
 * @returns {object} returns a response containing the user object
 * 
 * @memberof RegistrationController
 */
class RegistrationController {
  /**
    * @description manages the registrations of voters
    * 
    * @param {*} req - the request body method
    * 
    * @param {*} res - the response body method
    * 
    */
  async voterRegistration(req, res, next) {
    const { uuid } = req.userData;
    try {
      const checkRequest = await UserRepository.getOne({ uuid });
      const { state: voterState } = checkRequest;
      if (voterState) sendErrorResponse(res, 400, 'Voter registeration has been done');
      const {
        country, state, gender, city, residentialAddress: residential_address,
        dateOfBirth: date_of_birth 
      } = req.body;
      await UserRepository.update({
        country, state, city, gender, residential_address, date_of_birth 
      }, uuid);
      return successResponse(res, 200, 'Your voters registration done succesfully');
    } catch (error) {
      next(error);
    }
  }

  /** 
   * @description manages the registrations of party
   * 
   * @param {req} req- the request body method
   * 
   * @param {res} res- the response body method
   * 
   * @param {return} returns the succes message
   * 
   * @param {next} next- passes command to the next middleware
   * 
   */
  async candidateRegistration(req, res, next) {
    const { officeContesting, partyName } = req.body;
    const { uuid } = req.userData;
    try {
      const checkParty = await PartyRepository.getOne({ party_name: partyName });
      if (!checkParty) return sendErrorResponse(res, 409, `Party ${partyName} does not exists`);
      const { uuid: politicalParty } = checkParty;
      const checkOffice = await OfficeRepostitory.getOne({ name: officeContesting });
      if (!checkOffice) return sendErrorResponse(res, 404, `${officeContesting} can not be found`);
      const { uuid: officeUuid } = checkOffice;
      const candidate = await UserRepository.getOne({ uuid, party_uuid: politicalParty });
      if (!candidate) return sendErrorResponse(res, 400, `You are not eligible to contest with ${partyName} as only party members can`);
      const candidateInfo = {
        officeContesting, party_uuid: politicalParty, user_uuid: uuid, office_uuid: officeUuid 
      };
      await CandidateRepository.create(candidateInfo);  
      return successResponse(res, 201, `Your registration to contest ${officeContesting} with ${partyName} succesful`);
    } catch (error) {
      next(error);
    }
  }
    
  /**
 * @description registers political parties
 * 
 * @param {method} req - request body object
 * 
 * @param  {method} res - response body object
 * 
 * @param  {method} next- passes command to next middleware
 * 
 * @returns returns the value of the function
 * 
 *  @memberof RegistrationController
 * 
 */
  async partyRegistration(req, res, next) {
    const { partyName: party_name, phoneNumber: phone_number, partyAddress: address } = req.body;
    try {
      const party = await PartyRepository.getOne({ party_name });
      if (party) return sendErrorResponse(res, 409, `Party ${party_name} already exists`);
      const partyInfo = {
        party_name, phone_number, address
      };
      await PartyRepository.create(partyInfo);  
      return successResponse(res, 201, `Party ${party_name} creation submitted succesfully`);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description registers political parties
   * 
   * @param {method} req - request body object
   * 
   * @param  {method} res - response body object
   * 
   * @param  {method} next- passes command to next middleware
   * 
   * @returns returns the value of the function
   */
  async voterJoinParty(req, res, next) {
    const { partyName: party_name } = req.body;
    const { uuid } = req.userData;
    try {
      const checkParty = await PartyRepository.getOne({ party_name, status: 'accepted' });
      if (!checkParty) return sendErrorResponse(res, 404, `Party ${party_name} does not exists`); 
      const { uuid: party_uuid } = checkParty;
      const checkRequest = await UserPartyRepository.getOne({ user_uuid: uuid, party_uuid });
      if (checkRequest) sendErrorResponse(res, 400, 'Request has been previously made');
      await UserPartyRepository.createOne({ party_uuid, user_uuid: uuid });
      return successResponse(res, 200, `Your request to join ${party_name} succesfully`); 
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
  async createOffice(req, res, next) {
    const { officeName } = req.body;
    try {
      const checkOffice = await OfficeRepostitory.getOne({ name: officeName });
      if (checkOffice) return sendErrorResponse(res, 400, `${officeName} Office already existed`);
      await OfficeRepostitory.create({ name: officeName });
      return sendSuccessResponse(res, 201, `${officeName} created succesfully`);
    } catch (error) {
      next(error);
    }
  }
}

export default new RegistrationController();
