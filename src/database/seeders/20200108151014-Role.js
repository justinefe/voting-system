import uuid from 'uuid';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [{
    uuid: uuid.v4(),
    name: 'Super Administrator',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  },
  {
    uuid: uuid.v4(),
    name: 'Election Administrator',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  },
  {
    uuid: uuid.v4(),
    name: 'Party Administrator',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  },
  {
    uuid: uuid.v4(),
    name: 'Candidate',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  },
  {
    uuid: uuid.v4(),
    name: 'Election Supervisor',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  },
  {
    uuid: uuid.v4(),
    name: 'Voter',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }], {}),

  down: (queryInterface, Sequelize) => {
  }
};
