import uuid from 'uuid';
import { hashPassword } from '../../utils/hashPassword';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      uuid: uuid(),
      first_name: 'Efe',
      last_name: 'Just',
      email: 'efe3@gmail.com',
      password: hashPassword('Jei12345'),
      role: 'Voter',
      is_verified: true,
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid(),
      first_name: 'Makaraba',
      last_name: ' Blessing',
      email: 'blessingpeople@gmail.com',
      role: 'Candidate',
      is_verified: false,
      password: hashPassword('Bloated36'),
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid(),
      first_name: 'Mail',
      last_name: 'Awai',
      email: 'awamail@gmail.com',
      password: hashPassword('Workingwith1seed'),
      role: 'Super Administrator',
      is_verified: true,
      gender: 'male',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      uuid: uuid(),
      email: 'Jessica_Bins@hotmail.com',
      password: hashPassword('Password123'),
      first_name: 'Name',
      last_name: ' Hettinger',
      role: 'Voter',
      is_verified: true,
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid(),
      email: 'partyadmin@hotmail.com',
      password: hashPassword('Password123'),
      first_name: 'party',
      last_name: ' people',
      role: 'Party Administrator',
      is_verified: true,
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()')
    },
    {
      uuid: uuid(),
      email: 'electiondmin@hotmail.com',
      password: hashPassword('Password123'),
      first_name: 'election',
      last_name: ' admin',
      role: 'Election Administrator',
      is_verified: true,
      created_at: Sequelize.literal('NOW()'),
      updated_at: Sequelize.literal('NOW()')
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
  
  }
};
