'use strict';

module.exports = function (sequelize, DataTypes) {
  var notification = sequelize.define('notification', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    message: DataTypes.STRING
  }, {});

  notification.associate = function (models) {// associations can be defined here
  };

  return notification;
};