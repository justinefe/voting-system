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
// let candidate;
const {
  User,
  candidate,
  BlackListedToken,
  Role,
  permission,
  role_permission,
} = Model;

/**
 * User repository class
 *
 * @class
 */
class UserRepository {
  /**
   * @description constructor handles the user model
   *
   * User Model constructor
   *
   * @constructor
   *
   */
  constructor() {
    this.db = User;
  }

  /**
   * @description Creates a new user account with provided details
   *
   * @param {Object} param users details
   *
   * @return {Object} returns new user details
   */
  async create({
    password,
    email,
    first_name,
    last_name,
    is_verified,
    image_url = '',
    facebook_id = '',
    google_id = ''
  }) {
    try {
      const { dataValues } = await this.db.create({
        first_name,
        last_name,
        email,
        password,
        is_verified,
        image_url,
        facebook_id,
        google_id
      });
      return dataValues;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @description Returns users details based on the provided parameters
   *
   * @param {Object} condition checks required users parameter
   *
   * @param {Object} include adds users managers
   *
   * @return {Object} returns user details with managers uuid
   */
  async getOne(condition = {}, include = '') {
    try {
      return await this.db.findOne({ where: condition, include });
    } catch (e) {
      throw new Error(e);
    }
  }
  
  /**
   * @description this is a method that gets all users in the database
   * 
   * @returns {array} returns an array of user objects
   */
  async getAll() {
    try {
      return await User.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }


  /**
   * @description This is a function that finds a user token in the data base
   *
   * @param {Object} condition checks token in db
   *
   * @return {Object} returns token
   */
  async findToken(condition = {}) {
    try {
      return await BlackListedToken.findOne({ where: condition });
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
  async update(changes = {}, userId) {
    try {
      await this.getOne({ uuid: userId });
      return await this.db.update(changes, { where: { uuid: userId } });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @description gets a list of roles from the database
   * 
   * @returns {*} an array of role names
   */
  async getRoles() {
    try {
      const roles = await Role.findAll();
      if (!roles) return;
      const roleNames = roles.map(role => role.dataValues.name);
      return roleNames;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description gets a list of permissions from the database
   * 
   * @param {*} roleId
   * 
   * @returns {array} an array of permission names
   */
  async getRolePermissions(roleId) {
    try {
      const [roles] = await Role.findAll(
        {
          where: { uuid: roleId }, 
          include: [
            {
              model: permission,
              as: 'permissions',
              required: true,
              attributes: ['uuid', 'name'],
              through: { attributes: [] }
            }
          ],
        }
      );
      return roles.dataValues.permissions;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description gets a list of permissions from the database
   * 
   * @returns {array} an array of permission names
   */
  async getPermissions() {
    try {
      const permissions = await permission.findAll();
      if (!permissions) return;
      const permissionNames = permissions.map(permits => permits.dataValues.name);
      return permissionNames;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 
   * @param {string} email 
   * 
   * @param {string} newRole
   * 
   * @returns {object} updated user
   */
  async setRole(email, newRole) {
    try {
      const { uuid } = await Role.findOne({ where: { name: newRole } });
      const data = await User.update(
        { role_uuid: uuid, role: newRole },
        { where: { email }, plain: true }
      );
      if (newRole === 'Manager') {
        await Manager.create(
          { uuid: data.uuid }
        );
      }
      
      return data;
    } catch (error) {
      throw Error(error);
    }
  }

  /**
   * 
   * @param {string} role
   * 
   * @param {string} permits
   * 
   * @returns {object} updated user
   */
  async setPermission(role, permits) {
    try {
      const userRole = await Role.findOne({ where: { name: role } });
      const userPermission = await permission.findOne({ where: { name: permits } });
      const newRolePermission = await role_permission.create(
        { role_uuid: userRole.uuid, permission_id: userPermission.uuid }
      );
      return newRolePermission;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   *  @description findOne is a function that search for an office Location
   *
   * @param {object} condition limits the search of the office location
   *
   * @returns {object} the details of the office location that has been searched for
   */
  // eslint-disable-next-line require-jsdoc
  async findById(condition) {
    try {
      const tripRequest = await this.db.findByPk(condition);
      return tripRequest;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   *  @description findOne is a function that search for an office Location
   *
   * @param {object} condition limits the search of the office location
   *
   * @returns {object} the details of the office location that has been searched for
   */
  // eslint-disable-next-line require-jsdoc
  async findOne(condition = {}) {
    try {
      return await this.db.findOne({
        include: [{
          as: 'candidate',
          model: candidate,
          where: condition
        }]
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   *  @description findOne is a function that search for an office Location
   *
   * @param {object} condition limits the search of the office location
   *
   * @returns {object} the details of the office location that has been searched for
   */
  // eslint-disable-next-line require-jsdoc
  async findAll() {
    try {
      return await this.db.findAll({
        include: [{
          as: 'candidate',
          model: candidate,
        }]
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   *  @description findOne is a function that search for an office Location
   *
   * @param {object} condition limits the search of the office location
   *
   * @returns {object} the details of the office location that has been searched for
   */
  // eslint-disable-next-line require-jsdoc
  async checkVote(condition, value) {
    let newStr = await value.toString();
    try {
      const checkUser = await this.getOne({ uuid: condition });
      const { voted } = checkUser;
      
      if (voted === null) {
        await this.update({ voted: newStr }, condition);
        return false; 
      }
      const findAm = voted.split(',').includes(newStr); 

      if (findAm) return true;
      newStr = `${voted} ${newStr}`;
      
      await this.update({ voted: newStr }, condition);

      return false;      
    } catch (err) {
      throw new Error(err);
    }
  }
}
export default new UserRepository();
