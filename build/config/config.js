"use strict";

var _dotenv = require("dotenv");

(0, _dotenv.config)();
module.exports = {
  development: {
    username: 'root',
    // use_env_variable: 'DATABASE_URL_DEV',
    password: 'efe123',
    database: 'voting',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    // username: 'root',
    // password: 'efe123',
    use_env_variable: 'DATABASE_URL_DEV',
    // database: 'database_test',
    // host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    // username: 'root',
    use_env_variable: 'DATABASE_URL_DEV',
    // password: 'efe123',
    // database: 'database_production',
    // host: '127.0.0.1',
    dialect: 'mysql'
  }
};