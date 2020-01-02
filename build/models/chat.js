'use strict';

module.exports = function (sequelize, DataTypes) {
  var chat = sequelize.define('chat', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    message: DataTypes.STRING
  }, {});

  chat.associate = function (models) {// associations can be defined here
  };

  return chat;
};