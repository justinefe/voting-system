
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
    country: DataTypes.STRING,
    residential_address: DataTypes.STRING,
    city: DataTypes.STRING,
    role: DataTypes.STRING,
    role_uuid: {
      type: DataTypes.UUID
    },
    party_uuid: {
      type: DataTypes.UUID
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_partisan: {
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
    User.hasMany(models.candidate, {
      as: 'candidate', 
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
      onDelete: 'CASCADE',
    });
   
    User.hasOne(models.party, {
      as: 'party',
      foreignKey: 'admin_uuid',
      onDelete: 'CASCADE',
      constraints: false
    });
    User.belongsToMany(models.party, {
      through: 'user_party',
      foreignKey: 'party_uuid',
      constraints: false
    });
    User.hasMany(models.vote, {
      as: 'vote', 
      foreignKey: 'voter_uuid',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
