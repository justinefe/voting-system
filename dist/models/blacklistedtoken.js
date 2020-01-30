'use strict';

module.exports = function (sequelize, DataTypes) {
  var BlackListedToken = sequelize.define('BlackListedToken', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    token: DataTypes.TEXT
  }, {});

  BlackListedToken.associate = function (models) {// associations can be defined here
  };

  return BlackListedToken;
};