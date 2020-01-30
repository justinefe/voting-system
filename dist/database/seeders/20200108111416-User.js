"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _uuid = _interopRequireDefault(require("uuid"));

var _hashPassword = require("../../utils/hashPassword");

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      uuid: (0, _uuid["default"])(),
      first_name: 'Efe',
      last_name: 'Just',
      email: 'efe3@gmail.com',
      password: (0, _hashPassword.hashPassword)('Jei12345'),
      role: 'Voter',
      is_verified: true,
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()')
    }, {
      uuid: (0, _uuid["default"])(),
      first_name: 'Makaraba',
      last_name: ' Blessing',
      email: 'blessingpeople@gmail.com',
      role: 'Candidate',
      is_verified: false,
      password: (0, _hashPassword.hashPassword)('Bloated36'),
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()')
    }, {
      uuid: (0, _uuid["default"])(),
      first_name: 'Mail',
      last_name: 'Awai',
      email: 'awamail@gmail.com',
      password: (0, _hashPassword.hashPassword)('Workingwith1seed'),
      role: 'Super Administrator',
      is_verified: true,
      gender: 'male',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      uuid: (0, _uuid["default"])(),
      email: 'Jessica_Bins@hotmail.com',
      password: (0, _hashPassword.hashPassword)('Password123'),
      first_name: 'Name',
      last_name: ' Hettinger',
      role: 'Voter',
      is_verified: true,
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()')
    }, {
      uuid: (0, _uuid["default"])(),
      email: 'party@gmail.com',
      password: (0, _hashPassword.hashPassword)('Password123'),
      first_name: 'party',
      last_name: ' people',
      role: 'Party Administrator',
      is_verified: true,
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()')
    }, {
      uuid: (0, _uuid["default"])(),
      email: 'election@gmail.com',
      password: (0, _hashPassword.hashPassword)('Password123'),
      first_name: 'election',
      last_name: ' admin',
      role: 'Election Administrator',
      is_verified: true,
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()')
    }], {});
  },
  down: function down(queryInterface, Sequelize) {}
};