'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Results', {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      officeContested: {
        type: Sequelize.STRING
      },
      election_name: {
        type: Sequelize.STRING        
      },
      votes: {
        type: Sequelize.INTEGER        
      },
      total_votes: {
        type: Sequelize.INTEGER        
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
    return queryInterface.dropTable('Results');
  }
};