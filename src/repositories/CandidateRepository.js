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

const { candidate, party, User } = model;

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
   * @param {object} userId to update for user
   *
   * @returns {object} updated user
   */
  async update(changes = {}, userId) {
    try {
      await this.getOne({ uuid: userId });
      return await this.db.update(changes, { where: { uuid: userId } });
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
  async findAllCandidate() {
    try {
      return await this.db.findAll();
    } catch (err) {
      throw new Error(err);
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
          as: 'user',
          model: User,
          where: condition,
          required: true
        }]
      });
    } catch (err) {
      throw new Error(err);
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
  async findAll() {
    try {
      return await this.db.findAll({
        include: [{
          as: 'user',
          model: User
        }]
      });
    } catch (err) {
      throw new Error(err);
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
  async findAccepted(condition = {}) {
    try {
      return await this.db.findAll({
        where: condition
      });
    } catch (err) {
      throw new Error(err);
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
  async deleteOne(Item = {}) {
    try {
      await this.db.destroy({
        where: Item,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new CandidateRepository();
