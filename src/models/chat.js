'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    message: DataTypes.STRING,
    handle: DataTypes.STRING
  }, {});
  chat.associate = function(models) {
    // associations can be defined here
    chat.belongsTo(models.User, {
      as: 'user', 
      foreignKey: 'user_uuid' 
    });
  };
  return chat;
};