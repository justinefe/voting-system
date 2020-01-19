'use strict';
module.exports = (sequelize, DataTypes) => {
  const office_position = sequelize.define('office_position', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {});
  office_position.associate = (models) => {
    // associations can be defined here
    office_position.hasOne(models.vote, {
      as: 'vote', 
      foreignKey: 'office_uuid' 
    });
  };
  return office_position;
};



