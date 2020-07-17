/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import UserRepository from '../repositories/UserRepository';
import { blackListThisToken } from '../utils';
import { createToken, verifyToken } from '../modules/tokenProcessor';
import { sendErrorResponse, successResponse, sendSuccessResponse } from '../utils/sendResponse';
import { inValidEmail, inValidPassword, magicTrimmer } from '../modules/validator';
import sendEmail from '../services/emails';
import { hashPassword, unhashPassword } from '../utils/hashPassword';
import userInfo from '../utils/getUserInfo';
import models from '../models'


/**
 * @description User controller
 */
class AuthController {
  /**
   * @description Handles user signup form
   * 
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Function to trigger next middleware
   *
   * @return {Object} Return success message and account creation status
   */
  async signup({ protocol, headers, body }, res, next) {
    try {
      const userData = magicTrimmer(body);
      const { email } = userData;
      const result = await UserRepository.getOne({ email });
      if (!result) {
        body.password = hashPassword(body.password);
        const newUser = await UserRepository.create(userData);
        const token = createToken(
          {
            uuid: newUser.uuid,
            email,
            role: 'Voter'
          }
        );
        newUser.token = token;
        const link = `${protocol}//${headers.host}/api/v1/auth/confirm_email?token=${token}&id=${newUser.uuid}`;
        await sendEmail(
          email,
          'Thejust Online Voting System Verification',
          `Please kindly click on the link below to verify your account <br/> ${link}`
        );
        const userInformation = {
          message: 'User account created successfully',
          token,
          uuid: newUser.uuid,
          ...newUser,
          password: null
        };
        sendSuccessResponse(res, 201, userInformation);
      } else {
        return sendErrorResponse(res, 409, `User ${email} already exists`);
      }
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @description handles confirmation email sent to user's to verify its validity
   * 
   * @param {object} req
   *
   * @param {object} res
   *
   * @returns {object} returns a response object
   */
  async confirmEmail(req, res) {
    const { token } = req.query;
    try {
      const verify = await verifyToken(token);
      const user = await UserRepository.getOne({ uuid: verify.uuid });
      if (user.dataValues.is_verified === true) return sendErrorResponse(res, 400, 'Account verified already');
      await UserRepository.update({ is_verified: true }, verify.uuid);
      return successResponse(res, 200, 'Email verified successfully');
    } catch (err) {
      return sendErrorResponse(res, 400, 'Unable to verifiy email');
    }
  }

  /**
   * @description handles login from Google, twitter and Facebook
   *
   * @param {object} user accepts user details object
   *
   * @param {res} res object*
   *
   * @param {function} next returns error if process fails
   *
   * @returns {object} returns a new or existing user's details
   */
  async social({ user }, res, next) {
    try {
      const {
        social_id,
        name,
        image,
        email,
        provider
      } = user;

      const checkUser = provider === 'facebook'
        ? await UserRepository.getOne({ facebook_id: social_id })
        : await UserRepository.getOne({ google_id: social_id });
      if (checkUser) return sendSuccessResponse(res, 201, userInfo(checkUser));

      const newUser = await UserRepository.create({
        name,
        email,
        is_verified: true,
        image_url: image,
        facebook_id: (provider === 'facebook' ? social_id : ''),
        google_id: (provider === 'google' ? social_id : ''),
        role: 'Voter'
      });
      return sendSuccessResponse(res, 201, userInfo(newUser));
    } catch (err) {
      return next(err);
    }
  }

  /** 
   * @description Uses login with email and password
   *
   * @param {req} req the request object
   *
   * @param {res} res the response object
   *
   * @param {object} body this is the body of the request
   *
   * @returns {obj} returns an response object
   */
  async signin({ body }, res) {
    const { email, password } = body;
    const foundUser = await UserRepository.getOne({ email });

    if (!foundUser) return sendErrorResponse(res, 404, 'User not found');

    const confirmPassword = unhashPassword(password, foundUser.dataValues.password);

    if (!confirmPassword) return sendErrorResponse(res, 400, 'Incorrect Password');
    // if (!foundUser.dataValues.is_verified) return sendErrorResponse(res, 401, 'Verify Your Account');
    
    const token = await createToken(
      {
        uuid: foundUser.uuid,
        role: foundUser.role,
        email: foundUser.email,
      }
    );
    const userInformation = {
      token,
      uuid: foundUser.uuid,
    };
    return sendSuccessResponse(res, 200, userInformation);
  }
  

  /**
  * @description Sends reset link to user Email
  *
  * @param {Object} req - Request object
  *
  * @param {Object} res - Response object
  *
  * @returns {Object} object containing user data which will be embedded in link sent to user
  *
  * @memberof UserController
  */ 
  async sendResetLink(req, res) {
    const { email } = req.body;
    if (!inValidEmail(email)) {
      const findUser = await UserRepository.getOne({ email });

      if (!findUser) return sendErrorResponse(res, 404, 'User not found');

      const { uuid } = findUser;

      const token = await createToken({ uuid, email });
      const link = `${req.protocol}//${req.headers.host}/api/v1/auth/change_password?token=${token}`;
      try {
        await sendEmail(
          email,
          'Thejust Password Reset',
          `Please kindly click the link below to reset your password <br/> ${link}`
        );

        return successResponse(res, 200, 'A password reset link has been sent to your mailbox');
      } catch (error) {
        return sendErrorResponse(res, 500, 'Unable to perform the operation at the moment');
      }
    }
    return sendErrorResponse(res, 400, inValidEmail(email));
  }

  /**
   * @description Updates the user's password
   *
   * @param {object} req - request object
   *
   * @param {object} res - response object
   *
   * @param {object} next - response object
   *
   * @returns {object} either error or success
   */
  async resetPassword(req, res, next) {
    const { password } = req.body;
    const { token } = req.params;
    const { uuid } = await verifyToken(token);
    if (!inValidPassword(password)) {
      try {
        await UserRepository.update(uuid, { password });
        return successResponse(res, 200, 'Password Reset Successfully');
      } catch (error) {
        return next(error);
      }
    }
    return sendErrorResponse(res, 400, inValidPassword(password));
  }

  /*
  /**
   * @description Function to get specific user details
   *
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Function to trigger next middleware
   *
   * @return {Object} Object resoponse with current user information status
   */
  /*
  async show({ userData }, res, next) {
    const { dataValues: { email } } = userData;
    try {
      const { dataValues: user } = await UserRepository.getOne({ email });
      if (user) {
        user.password = undefined;
        return sendSuccessResponse(res, 200, user);
      }
      return sendErrorResponse(res, 400, 'User not found');
    } catch (error) {
      next(error);
    }
  }
*/
  /**
   * @description logs out a user
   *
   * @param {object} req request from body to log out
   *
   * @param {object} res response to the body
   *
   * @returns {object} success
   */
  async signout(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
      await blackListThisToken(token);
      return sendSuccessResponse(res, 200, 'You have succesfully signout');
    } catch (error) {
      return sendErrorResponse(res, 400, error);
    }
  }
  /*
  /**
   * @description Function to update user details
   *
   * @param {Object} req - HTTP request object
   *
   * @param {Object} res - HTTP response object
   *
   * @param {Function} next - Function to trigger next middleware
   *
   * @return {Object} Object resoponse with current user created status
   *//*
  async update(req, res, next) {
    const { body } = req;
    try {
      const userData = magicTrimmer(body);
      const { email } = userData;
      const result = await UserRepository.getOne({ email });
      if (!result) {
        const { userData: { dataValues: { uuid: userId } } } = req;
        const [numberOfEdits, [{ dataValues }]] = await UserRepository.update(userId, body);
        numberOfEdits > 0
          ? sendSuccessResponse(res, 200, dataValues)
          : sendSuccessResponse(res, 200, 'No edit made');
      } else {
        return sendErrorResponse(res, 409, `User ${email} already exists`);
      }
    } catch (error) {
      next(error);
    }
  }
  */
}


export default new AuthController();
