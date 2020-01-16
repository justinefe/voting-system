
module.exports = (sequelize, DataTypes) => {
  const vote = sequelize.define('vote', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    today: DataTypes.STRING
  }, {});
  vote.associate = function(models) {
    // associations can be defined here
  };
  return vote;
};