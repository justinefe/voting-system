'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_parties', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_uuid: {
        type: Sequelize.UUID
      },
      party_uuid: {
        type: Sequelize.UUID
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_parties');
  }
};