/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */


/**
 * @fileoverview Contains the User Party Repository class, an interface for querying User table
 *
 * @author TheJust
 *
 * @requires models/vote.js
 */
import model from '../models';

const { vote, candidate, User } = model;

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
    this.db = vote;
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
   * @param {string} changes
   *
   * @param {object} userId to update for user
   *
   * @returns {object} updated user
   */
  async update(changes = {}, condition) {
    try {
      await this.getOne(condition);
      return await this.db.update(changes, { where: condition });
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
  async CreateAll(field = {}) {
    try {
      await this.db.bulkCreate(field);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description  Creates a candidate
   * 
   * @param field describes the object keys and values to be created
   * 
   * @returns the created field data
   */
  async destroyAll() {
    try {
      await this.db.destroy({
        where: {},
        truncate: true
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findMaxmum(condition = {}) {
    try {
      return await this.db.max('votes', {
        where: condition
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findSum(condition = {}) {
    try {
      return await this.db.sum('votes', {
        where: condition
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description  Creates a candidate
   * 
   * @param field describes the object keys and values to be created
   * 
   * @returns the created field data
   */
  async Vote(condition = {}) {
    try {
      const checkcondition = await this.getOne(condition);
      const { votes: voteValue } = checkcondition;
      const increasedVote = voteValue + 1;
      await this.update({ votes: Number(increasedVote) }, condition);
      /*
      User.findByPk(1).then(user => {
        return user.increment('my-integer-field', {by: 2})
      }).then(user => {
        // Postgres will return the updated user by default (unless disabled by setting { returning: false })
        // In other dialects, you'll want to call user.reload() to get the updated instance...
      })
      */
    } catch (error) {
      throw new Error(error);
    }
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
  async getOneAll(condition = {}) {
    try {
      // return await this.db.findOne({ where: condition, include });
      return await this.db.findOne({
        where: condition,
        include: [{
          model: candidate,
          as: 'candidate',
          include: [{
            model: User,
            as: 'user',
            where: {
              role: 'Candidate'
            },
            required: false
          }]
        }]
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new CandidateRepository();
