import { config } from 'dotenv';

config();
// console.log(process.env.DATABASE_URL, process.env.DEV_DATABASE, process.env.TEST_DATABASE);

module.exports = {
  development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DEV_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql' 
  },
  test: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.TEST_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql'  
  },
  production: {
    // username: process.env.USERNAME,
    // password: process.env.PASSWORD,
    // database: process.env.CLEARDB_DATABASE_URL,
    use_env_variable: process.env.DATABASE_URL,
    // database: process.env.PRODUCTION_DATABASE,
    // host: process.env.HOST,
    // host: '127.0.0.1',
    dialect: 'postgres'
  }
};

// JWT_SECRET = thejust
// USERNAME=ba12ab77a2970d
// PASSWORD=277b2754
// https://voting-system-backend.herokuapp.com/
// HOST=us-cdbr-iron-east-01.cleardb.net
// PASSWORD=efe123
