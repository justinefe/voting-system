'use strict';

module.exports = function (sequelize, DataTypes) {
  var Result = sequelize.define('Result', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    officeContested: DataTypes.STRING,
    votes: DataTypes.INTEGER,
    total_votes: DataTypes.INTEGER,
    election_name: DataTypes.STRING
  }, {});

  Result.associate = function (models) {// associations can be defined here
  };

  return Result;
};