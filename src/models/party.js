'use strict';
module.exports = (sequelize, DataTypes) => {
  const party = sequelize.define('party', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    party_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  party.associate = (models) => {
    // associations can be defined here
    party.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'admin_uuid',
      onDelete: 'CASCADE',
      constraints: false
    });
    party.hasMany(models.candidate, {
      as: 'candidate', 
      foreignKey: 'party_uuid',
      onDelete: 'CASCADE'
    });
    party.belongsToMany(models.User, {
      through: 'user_party',
      foreignKey: 'user_uuid',
      constraints: false
    });
  };
  return party;
};