'use strict';

module.exports = function (sequelize, DataTypes) {
  var permission = sequelize.define('permission', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {});

  permission.associate = function (models) {
    permission.belongsToMany(models.Role, {
      through: 'role_permission',
      as: 'roles',
      foreignKey: 'permission_id'
    });
  };

  return permission;
};