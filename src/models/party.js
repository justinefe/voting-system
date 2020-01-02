'use strict';
module.exports = (sequelize, DataTypes) => {
  const party = sequelize.define('party', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {});
  party.associate = function(models) {
    // associations can be defined here
  };
  return party;
};