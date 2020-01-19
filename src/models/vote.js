
module.exports = (sequelize, DataTypes) => {
  const vote = sequelize.define('vote', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {});
  vote.associate = models => {
    vote.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'voter_uuid',
      onDelete: 'CASCADE',
      constraints: false
    });
    vote.belongsTo(models.candidate, {
      as: 'candidate', 
      foreignKey: 'candidate_uuid',
      onDelete: 'CASCADE'
    });
    vote.belongsTo(models.office_position, {
      as: 'office',
      foreignKey: 'office_uuid',
      onDelete: 'CASCADE',
      constraints: false
    });
    // associations can be defined here
  };
  return vote;
};