'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('candidates', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      party_uuid: {
        type: Sequelize.UUID
      },
      user_uuid: {
        type: Sequelize.UUID
      },
      office_uuid: {
        type: Sequelize.UUID
      },
      officeContesting: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('candidates');
  }
};