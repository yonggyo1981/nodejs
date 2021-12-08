const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Sequelize -> .QueryTypes,  sequelize -> sync (DB 연결), query(.. ) SQL 실행 


module.exports = { Sequelize, sequelize };