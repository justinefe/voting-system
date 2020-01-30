"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _uuid = _interopRequireDefault(require("uuid"));

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      uuid: _uuid["default"].v4(),
      name: 'Super Administrator',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      uuid: _uuid["default"].v4(),
      name: 'Election Administrator',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      uuid: _uuid["default"].v4(),
      name: 'Party Administrator',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      uuid: _uuid["default"].v4(),
      name: 'Candidate',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      uuid: _uuid["default"].v4(),
      name: 'Election Supervisor',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      uuid: _uuid["default"].v4(),
      name: 'Voter',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }], {});
  },
  down: function down(queryInterface, Sequelize) {}
};