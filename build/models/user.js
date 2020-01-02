"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    state: DataTypes.STRING,
    party: DataTypes.STRING,
    role: DataTypes.STRING,
    role_uuid: {
      type: DataTypes.UUID
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gender: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    updatedAt: {
      type: DataTypes.DATE,
      filed: 'updated_at'
    }
  }, {
    underscored: true,
    sequelize: sequelize,
    modelName: 'user'
  });

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.vote, {
      as: 'user',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.notification, {
      as: 'notification',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.comment, {
      as: 'comment',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.chat, {
      as: 'chat',
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    User.belongsToMany(models.party, {
      as: 'user',
      foreignKey: 'party_uuid'
    });
  };

  return User;
};