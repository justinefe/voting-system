'use strict';

module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    Name: DataTypes.STRING
  }, {});

  Role.associate = function (models) {// associations can be defined here
  };

  return Role;
};