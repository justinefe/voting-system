/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
// import PartyRepository from '../repositories/PartyRepository';
// import UserPartyRepository from '../repositories/UserPartyRepository';

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
class AdminController {
  /**
   * @description Assign roles to users
   *
   * @param {*} req - Request Object
   *
   * @param {*} res - Response Object
   *
   * @returns {object} - returns a response object
   *
   * @memberof AdminController
   */
  async assignRole(req, res) {
    const { email, role } = req.body;
    try {
      if (!inValidEmail(email)) {
        const roles = await UserRepository.getRoles();
        if (!roles.includes(role)) return sendErrorResponse(res, 400, `${role} role does not exist`);
        const updatedUser = await UserRepository.setRole(email, role);
        if (!updatedUser) return sendErrorResponse(res, 404, `User with email ${email} not found`);
        return successResponse(res, 200, `New role assigned to ${email}`);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description gets a list of all users
   *
   * @param {object} req - request object
   *
   * @param {object} res - response object
   *
   * @returns {object} returns a response object
   *
   * @memberof AdminController
   */
  async getUsers(req, res) {
    const users = await UserRepository.getAll();
    if (!users) return sendErrorResponse(res, 404, 'No user found');
    const usersInfo = users.map(user => {
      const userInfo = {
        name: user.name,
        email: user.email,
        is_verified: user.is_verified,
        role: user.role
      };
      return userInfo;
    });
    return sendSuccessResponse(res, 200, usersInfo);
  }

  /**
   * @description gets a user by uuid
   *
   * @param {object} req request object
   *
   * @param {object} res response object
   *
   * @returns {object} returns a response containing the user object
   *
   * @memberof AdminController
   */
  async getUser(req, res) {
    const { email } = req.params;
    const user = await UserRepository.getOne({ email });
    if (!user) return sendErrorResponse(res, 404, 'User not found');
    const userInfo = {
      name: user.name,
      email: user.email,
      is_verified: user.is_verified,
      role: user.role
    };
    return sendSuccessResponse(res, 200, userInfo);
  }

  /**
   * @description assigns permissions to role
   *
   * @param {object} req request object
   *
   * @param {object} res response object
   *
   * @returns {object} returns a response containing the user object
   *
   * @memberof AdminController
   */
  async assignPermission(req, res) {
    const { role, permission } = req.body;
    try {
      const roles = await UserRepository.getRoles();
      const permissions = await UserRepository.getPermissions();
      if (!permissions.includes(permission)) return sendErrorResponse(res, 400, `${permission} permission does not exist`);
      if (!roles.includes(role)) return sendErrorResponse(res, 400, `${role} role does not exist`);
      await UserRepository.setPermission(role, permission);
      return successResponse(res, 200, `${permission} permission assigned to ${role} successfully`);
    } catch (error) {
      return sendErrorResponse(res, 500, 'Unable to assign permission');
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
  async approveVoterParty(req, res, next) {
    const { uuid } = req.userData;
    const { party_uuid: partyUuid } = req.params;
    const { status } = req.body;
    try {
      const { role: adminRequester } = await UserRepository.getOne({ uuid });
      const { admin_uuid: partyAdmin } = await PartyRepository.getOne({ uuid: partyUuid });
      if (!partyAdmin) return sendErrorResponse(res, 404, `Party with ID ${partyUuid} does not exist`); 
      if (adminRequester !== 'Party Administrator' && partyAdmin !== uuid) return sendErrorResponse(res, 401, 'Only party administrator can approve party membership');
      await UserPartyRepository.update({
        status,
      }, partyUuid);
      return successResponse(res, 200, `You have succesfully ${status} a voter request to join party`); 
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
  async approvePartyAdmin(req, res, next) {
    // eslint-disable-next-line camelcase
    const { admin_uuid } = req.params;
    const { partyName: party_name } = req.body;
    const { uuid } = req.userData;  
    try {
      const { role: electAdmin } = await UserRepository.getOne({ uuid });
      if (electAdmin !== 'Election Administrator') return sendErrorResponse(res, 401, 'Only Election Adminstrator can approve admin for parties'); 
      const { role: partyAdmin } = await UserRepository.getOne({ uuid: admin_uuid });
      if (partyAdmin !== 'Party Administrator') return sendErrorResponse(res, 401, 'Only Party Adminstrator can be admin for parties'); 
      const party = await PartyRepository.getOne({ party_name });
      if (!party) return sendErrorResponse(res, 404, `${party_name} does not exist`);
      await PartyRepository.update({
        admin_uuid,
      }, party_name);
      return sendSuccessResponse(res, 200, `Party admin has been assigned to ${party_name}`);
    } catch (error) {
      return next(error);
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
    const { candidacy_uuid: candidacyUuid } = req.params;
    // const { status } = req.body;
    try {
      const { role: partyAdminRole, uuid: userId } = await UserRepository.getOne({ uuid });
      if (!partyAdminRole) sendErrorResponse(res, 401, 'You are not authorize to approve a party');
      const { uuid: partyUuid } = PartyRepository.getOne({ admin_uuid: userId });
      const test = await PartyRepository.findAll(partyUuid);
      console.log('TEST', test);

      const { party_uuid } = await CandidateRepository.getOne({ candidacyUuid });
      if (party_uuid !== partyUuid) return sendErrorResponse(res, 400, 'You are not authorize to approve a party');

      if (partyAdminRole !== 'Party Administrator' && uuid !== partyUuid) return sendErrorResponse(res, 401, 'Only a political party can approve candidacy');     
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
  async approveParty(req, res, next) {
    const { party_uuid } = req.params;
    const { uuid } = req.userData;
    const { status } = req.body;
    try {
      const { role: electAdmin } = await UserRepository.getOne({ uuid });
      if (!electAdmin) sendErrorResponse(res, 401, 'You are not authorize to approve a party');
      const party = await PartyRepository.getOne({ party_uuid });
      if (!party) sendErrorResponse(res, 404, 'party can not be found');
      await PartyRepository.update({ status }, party_uuid);
      return sendSuccessResponse(res, 200, `Party has been ${status}`);
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();
