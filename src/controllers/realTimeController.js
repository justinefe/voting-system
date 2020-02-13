/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
// import socket from 'socket.io';
import socket from 'socket.io';
import server from 'http';
import { sendSuccessResponse, sendErrorResponse, successResponse } from '../utils/sendResponse';
import ChatRepository from '../repositories/ChatRepository';

const io = socket(server);


// console.log('llllll', io);
/**
 * Ezekiel 21:27
 * @module realTimeController
 * @description Controls admin based activities
 */
class realTimeController {
  /**
   * @description Handles two way communication from server and client
   *
   * @param {*} req - Request Object
   *
   * @param {*} res - Response Object
   * 
   * @param {next} next - passes control to the middlewware
   *
   * @returns {object} - returns a response object
   *
   * @memberof realTimeController
   */
  async addChat(req, res, next) {
    const { uuid: userUuid } = req.userData;
    const { handle, message } = req.body;
    try {
      const field = {
        user_uuid: userUuid,
        handle,
        message,
      };
      io.emit('message', req.body);
      await ChatRepository.createOne(field);
      return sendSuccessResponse(res, 200, 'You have succesfully chated candidate');
    } catch (error) {
      next(error);
    }
  }  
}

export default new realTimeController();
