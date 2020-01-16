/* eslint-disable camelcase */
'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_party = sequelize.define('user_party', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: {
      type: DataTypes.UUID
    },
    party_uuid: {
      type: DataTypes.UUID
    },
    is_verified: DataTypes.STRING
  }, {});
  user_party.associate = (models) => {
    // associations can be defined here
  };
  return user_party;
};