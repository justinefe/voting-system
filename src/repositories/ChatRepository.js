/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */


/**
 * @fileoverview Contains the User Party Repository class, an interface for querying User table
 *
 * @author TheJust
 *
 * @requires models/office_position.js
 */
import model from '../models';

const { chat } = model;

/**
 * @class
 */

class ChatRepository {
  /**
    * @description constructor handles the user model
    *
    * candidate model constructor
    *
    * @constructor
    *
    */
  constructor() {
    this.db = chat;
  }
  
  /**
   * @description  Creates a candidate
   * 
   * @param field describes the object keys and values to be created
   * 
   * @returns the created field data
   */
  async createOne(field = {}) {
    try {
      await this.db.create(field);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new ChatRepository();
