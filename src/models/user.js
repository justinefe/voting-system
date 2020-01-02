
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    state: DataTypes.STRING,
    party: DataTypes.STRING,
    role: DataTypes.STRING,
    role_uuid: {
      type: DataTypes.UUID
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gender: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    }, 
    updatedAt: {
      type: DataTypes.DATE,
      filed: 'updated_at'
    }
  }, {
    underscored: true,
    sequelize,
    modelName: 'user'
  });
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.vote, {
      as: 'vote', 
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE' 
    });
    User.hasMany(models.notification, {
      as: 'notification', 
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.comment, {
      as: 'comment', 
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.chat, {
      as: 'chat', 
      foreignKey: 'user_uuid',
      onDelete: 'CASCADE'
    });
    User.belongsToMany(models.party, {
      as: 'user_group', 
      through: 'user_party',
      foreignKey: 'party_uuid' 
    });
  };
  return User;
};
