module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    party: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'role'
    },
    role_uuid: {
      type: Sequelize.UUID
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    gender: {
      type: Sequelize.STRING
    },
    date_of_birth: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'updated_at'
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Users')
};
