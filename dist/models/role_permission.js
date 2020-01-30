"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var role_permission = sequelize.define('role_permission', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    role_uuid: DataTypes.UUID,
    permission_id: DataTypes.UUID
  }, {});

  role_permission.associate = function (models) {// associations can be defined here
  };

  return role_permission;
};

exports["default"] = _default;