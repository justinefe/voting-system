/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */

/**
 * @fileoverview Contains the User Party Repository class, an interface for querying User table
 *
 * @author TheJust
 *
 * @requires models/Party.js
 */
import Sequelize from 'sequelize';
import model from '../models';
// import CandidateRepository from './CandidateRepository';

const { party, candidate } = model;

/**
 * @class
 */

class PartyRepository {
  /**
    * @description constructor handles the user model
    *
    * Party model constructor
    *
    * @constructor
    *
    */
  constructor() {
    this.db = party;
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
   * @description  Creates a party
   * 
   * @param field describes the object keys and values to be created
   * 
   * @returns the created field data
   */
  async create(field = {}) {
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
   * @param {object} partyName to update for user
   *
   * @returns {object} updated user
   */
  async update(changes = {}, partUuid) {
    try {
      await this.getOne({ uuid: partUuid });
      return await this.db.update(changes, { where: { uuid: partUuid } });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   * @param {string} changes
   *
   * @param {object} userId to update for user
   *
   * @returns {object} updated user
   */
  async findOne(condition = {}) {
    try {
      return await this.db.findOne({
        include: [{
          as: 'candidate',
          model: candidate,
          where: condition,
          required: false
        }]
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new PartyRepository();
