/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/**
 * @fileoverview Contains the User Auth Repository class, an interface for querying User table
 *
 * @author TheJust
 *
 * @requires models/User.js
 */

import Model from '../models';

const {
  Result
} = Model;

/**
 * Result repository class
 *
 * @class
 */class ResultRepository {
  /**
     * @description constructor handles the user model
     *
     * User Model constructor
     *
     * @constructor
     *
     */
  constructor() {
    this.db = Result;
  }
  
  /**
     * @description Creates a new user account with provided details
     *
     * @param {Object} field users details
     *
     * @return {Object} returns new user details
     */    
  async CreateAll(field = {}) {
    try {
      console.log(this.db, 'dvadfdfddsfdf');  
      await this.db.bulkCreate(field);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     * @description Creates a new user account with provided details
     *
     * @param {Object} field users details
     *
     * @return {Object} returns new user details
     */    
  async CreateOne(field = {}) {
    try {
      await this.db.create(field);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new ResultRepository();
