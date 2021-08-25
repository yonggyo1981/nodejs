const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; // env 값에 해당하는 DB 계정 설정

const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**
	sequelize.query(sql, {
		replacements: 바인딩 변수,
		type : Sequelize.QueryTypes.SELECT|INSERT|UPDATE|DELETE 
	});
*/
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;