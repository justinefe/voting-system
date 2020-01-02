'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    message: DataTypes.STRING
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
  };
  return comment;
};