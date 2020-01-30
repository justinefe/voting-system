"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _uuid = _interopRequireDefault(require("uuid"));

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('permissions', [{
      uuid: _uuid["default"].v4(),
      name: 'create',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      uuid: _uuid["default"].v4(),
      name: 'read',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      uuid: _uuid["default"].v4(),
      name: 'update',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      uuid: _uuid["default"].v4(),
      name: 'delete',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }], {});
  },
  down: function down(queryInterface, Sequelize) {}
};