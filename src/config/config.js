import { config } from 'dotenv';


config();
console.log(process.env.PASSWORD, process.env.USER, process.env.DEV_DATABASE, '==== Password');

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
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
