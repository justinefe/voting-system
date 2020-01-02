module.exports = (sequelize, DataTypes) => {
  const candidate = sequelize.define('candidate', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {});
  candidate.associate = (models) => {
    // associations can be defined here
  };
  return candidate;
};
