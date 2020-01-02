"use strict";

module.exports = function (sequelize, DataTypes) {
  var candidate = sequelize.define('candidate', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {});

  candidate.associate = function (models) {// associations can be defined here
  };

  return candidate;
};