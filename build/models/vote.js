"use strict";

module.exports = function (sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    today: DataTypes.STRING
  }, {});

  Vote.associate = function (models) {// associations can be defined here
  };

  return Vote;
};