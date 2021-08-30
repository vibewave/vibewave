const Sequelize = require('sequelize');
const db = require('../db');

const Track = db.define('track', {
	trackUri: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	artist: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	albumUrl: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	duration: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	order: {
		type: Sequelize.INTEGER,
	},
});

module.exports = Track;
