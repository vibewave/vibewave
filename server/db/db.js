/* --- SAMPLE DB SETUP CODE (Below exmple uses Postgres database with Sequelize) ---

const path = require('path');
const DB = require('sequelize');
const appDir = require('fs').realpathSync(process.cwd());
const pk = require(path.resolve(appDir, 'package.json'));

const dbName = pk.name + (process.env.NODE_ENV === 'test' ? '-test' : '');
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;

const config = {
  logging: false
};

if(process.env.LOGGING === 'true') {
  delete config.logging
}

if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new DB(dbUrl, config);

module.exports = db


*/
