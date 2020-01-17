/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

/**
 * @fileoverview Contains the User Party Repository class, an interface for querying User table
 *
 * @author TheJust
 *
 * @requires models/Party.js
 */
import model from '../models';
// import CandidateRepository from './CandidateRepository';

const { user_party: userParty } = model;

/**
 * @class
 */

class UserPartyRepository {
  /**
    * @description constructor handles the user model
    *
    * Party model constructor
    *
    * @constructor
    *
    */
  constructor() {
    this.db = userParty;
  }

  /**
   * @description Returns party details based on the provided parameters
   *
   * @param {Object} condition checks required party parameter
   *
   * @param {Object} include adds party 
   *
   * @return {Object} returns party details 
   */
  async getOne(condition = {}, include = '') {
    try {
      return await this.db.findOne({ where: condition, include });
    } catch (e) {
      throw new Error(e);
    }
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

  /**
   *
   * @param {string} changes
   *
   * @param {object} partyUuid to update for user
   *
   * @returns {object} updated user
   */
  async update(changes = {}, partyUuid) {
    try {
      await this.getOne({ party_uuid: partyUuid });
      return await this.db.update(changes, { where: { party_uuid: partyUuid } });
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new UserPartyRepository();
