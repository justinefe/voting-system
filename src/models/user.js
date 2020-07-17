
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
    gender: DataTypes.STRING,
    voted: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
    }, 
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, 
  );
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
    User.belongsTo(models.office_position, {
      as: 'office',
      foreignKey: 'is_partisan',
      constraints: false
    });
  };
  return User;
};

// //Migration for Category
// 'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('Categories', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       name: {
//         type: Sequelize.STRING
//       },
//       description: {
//         type: Sequelize.STRING
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('Categories');
//   }
// };
// //Migration for PreferedCategory
// 'use strict';
// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.createTable('PreferedCategories', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       userId: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       categoryId: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//         createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.dropTable('PreferedCategories');
//   }
// };
// //user model
// // import helpers from '../../helpers';

// // const { hashPassword } = helpers;

// // module.exports = (sequelize, DataTypes) => {
// //   const User = sequelize.define(
// //     'User',
// //     {
// //       firstName: DataTypes.STRING,
// //       lastName: DataTypes.STRING,
// //       userName: DataTypes.STRING,
// //       email: DataTypes.STRING,
// //       password: DataTypes.STRING,
// //       role: DataTypes.STRING,
// //       emailNotify: DataTypes.BOOLEAN,
// //       inAppNotify: DataTypes.BOOLEAN,
// //       emailVerification: DataTypes.STRING,
// //       expiredAt: DataTypes.DATE
// //     },
// //     {
// //       hooks: {
// //         beforeCreate: async (user) => {
// //           user.password = await hashPassword(user.password);
// //         }
// //       },
// //     }
// //   );

// //   User.associate = (models) => {
// //     // associations can be defined here
// //     User.hasMany(models.PreferedCategory, {
// //       as: 'PreferedCategory', 
// //       foreignKey: 'userId',
// //       onDelete: 'CASCADE'
// //     });
// //   };

// //   User.prototype.userResponse = function userResponse() {
// //     const userData = {
// //       id: this.id,
// //       firstName: this.firstName,
// //       lastName: this.lastName,
// //       email: this.email,
// //       role: this.role,
// //       userName: this.userName,
// //       createdAt: this.createdAt,
// //       updatedAt: this.updatedAt,
// //     };

// //     return userData;
// //   };
// //   return User;
// // };

// // //category model
// // 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Category = sequelize.define('Category', {
//     name: DataTypes.STRING,
//     description: DataTypes.STRING
//   }, {});
//   Category.associate = function(models) {
//     // associations can be defined here
//     Category.belongsTo(models.PreferedCategory, {
//       as: 'PreferedCategory',
//       foreignKey: 'categoryId',
//       onDelete: 'CASCADE',
//       constraints: false
//     });
//   };

  
//   return Category;
// };
// //preferedCategory model
// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const PreferedCategory = sequelize.define('PreferedCategory', {
//     }, {});
//   PreferedCategory.associate = function(models) {
//     // associations can be defined here
//     PreferedCategory.belongsTo(models.User, {
//       as: 'user',
//       foreignKey: 'userId',
//       onDelete: 'CASCADE',
//       constraints: false
//     });
//     PreferedCategory.hasOne(models.Category, {
//       as: 'Category', 
//       foreignKey: 'categoryId',
//       onDelete: 'CASCADE'
//     });
//   };
//   return PreferedCategory;
// };
// //category controller

// //category route


// import express from 'express';
// import 'express-async-errors';
// import { selectCategory } from '../../controllers/category';


// const categoryRoutes = express();

// categoryRoutes.post('/select_category', selectCategory );

// export default categoryRoutes;
