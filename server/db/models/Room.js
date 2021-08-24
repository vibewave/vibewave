const Sequelize = require('sequelize');
const db = require('../db');

const Room = db.define('room', {
	title: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	description: {
		type: Sequelize.TEXT,
	},
	hostId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

module.exports = Room;
