"use strict";

module.exports = function (sequelize, DataTypes) {
  var candidate = sequelize.define('candidate', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    officeContesting: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});

  candidate.associate = function (models) {
    candidate.belongsTo(models.party, {
      as: 'party',
      foreignKey: 'party_uuid'
    });
    candidate.belongsTo(models.office_position, {
      as: 'office',
      foreignKey: 'office_uuid'
    });
    candidate.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uuid'
    });
    candidate.hasOne(models.vote, {
      as: 'vote',
      foreignKey: 'candidate_uuid'
    }); // associations can be defined here
  };

  return candidate;
};