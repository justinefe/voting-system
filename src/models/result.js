'use strict';
module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    party: DataTypes.STRING
  }, {});
  Result.associate = function(models) {
    // associations can be defined here
  };
  return Result;
};