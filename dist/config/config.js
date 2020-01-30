"use strict";

var _dotenv = require("dotenv");

(0, _dotenv.config)();
module.exports = {
  development: {
    username: 'root',
    password: 'efe123',
    database: 'voting',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.TEST_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};