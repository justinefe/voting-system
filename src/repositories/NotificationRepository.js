/* eslint-disable require-jsdoc */
import Models from '../models';

const { Notification } = Models;

/**
 * @description NotificaionRepository handles method that query our database
 */
class NotificationRepository {
  /**
   * @description constructor handles the properties/univsersal data for our requestRepository
   */
  constructor() {
    this.db = Notification;
  }

  /**
   * @description Returns user's selected notifications
   *
   * @param {Object} condition - Checks notification based on the condition
   *
   * @return {Object} returns selected notification details
   */
  async getAll(condition = {}) {
    try {
      return await this.db.findAll({ where: condition });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
 * @description NotificationRepository handles method that query our database
 *
 * @param {object} notificationDetails refers to the notification data
 *
 * @returns {object} the details of the request that was created
 */
  async create(notificationDetails) {
    try {
      const { dataValues } = await this.db.create(notificationDetails);
      return dataValues;
    } catch (err) {
      throw new Error(err);
    }
  }

/**
 * @description NotificationRepository handles method that query our database
 *
 * @param {object} condition refers to the notification data
 *
 * @returns {object} the details of the request that was created
 */
  // eslint-disable-next-line class-methods-use-this
  async findNotificationById(condition) {
    try {
      const include = '';
      const tripRequest = await this.db.findOne({ where: condition, include });
      return tripRequest;
    } catch (err) {
      throw new Error(err);
    }
  }
}
// async getOne(condition = {}, include = '') {
//   try {
//     return await this.db.findOne({ where: condition, include });
//   } catch (e) {
//     throw new Error(e);
//   }
// }
export default new NotificationRepository();
