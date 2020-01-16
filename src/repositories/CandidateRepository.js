/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */


/**
 * @fileoverview Contains the User Party Repository class, an interface for querying User table
 *
 * @author TheJust
 *
 * @requires models/candidate.js
 */
import Sequelize from 'sequelize';
import model from '../models';

const { candidate, party } = model;

/**
 * @class
 */

class CandidateRepository {
  /**
    * @description constructor handles the user model
    *
    * candidate model constructor
    *
    * @constructor
    *
    */
  constructor() {
    this.db = candidate;
  }
  
  /**
   * @description  Creates a candidate
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
   * @param 
   */
  async findAll(modelvalue) {
    try {
      return this.db.findAll({
        include: [{
          model: party,
          where: { uuid: Sequelize.col(`${this.db}.${modelvalue}`) }
        }]
      });
    } catch (error) {
      throw new error(error);
    }
  }
}

export default new CandidateRepository();
