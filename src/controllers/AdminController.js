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
    const { user_uuid } = req.params;
    const { status } = req.body;
    try {
      const checkUser = await UserPartyRepository.getOne({ user_uuid });

      if (!checkUser) sendErrorResponse(res, 400, 'User has not made request to join a political party');

      const { party_uuid: partyUuid } = checkUser;
      const checkParty = await PartyRepository.getOne({ uuid: partyUuid });
      const { admin_uuid: partyAdmin } = checkParty;

      if (partyAdmin !== uuid) {
        return sendErrorResponse(res, 401, 'Only party administrator can approve party membership');
      }
      
      if (status === 'accepted') { 
        await UserPartyRepository.update({
          status,
        }, partyUuid);
        await UserRepository.update({ party_uuid: partyUuid }, user_uuid); 
      }
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
    try {
      const checkUser = await UserRepository.getOne({ uuid: admin_uuid });

      if (!checkUser) sendErrorResponse(404, res, 'Admin not  user');

      const { role: partyAdmin } = checkUser;

      if (partyAdmin !== 'Party Administrator') return sendErrorResponse(res, 401, 'Only Party Adminstrator can be admin for parties'); 
      
      const party = await PartyRepository.getOne({ party_name });
      
      if (!party) return sendErrorResponse(res, 404, `${party_name} does not exist`);
      
      const { uuid: partyUuid } = party;
      
      await PartyRepository.update({
        admin_uuid,
      }, partyUuid);
      
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
  async approveParty(req, res, next) {
    const { party_uuid } = req.params;
    const { status } = req.body;
    try {
      const party = await PartyRepository.getOne({ uuid: party_uuid });

      if (!party) sendErrorResponse(res, 404, 'party can not be found');
      await PartyRepository.update({ status }, party_uuid);
      
      return sendSuccessResponse(res, 200, `Party has been ${status}`);
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();
