const Sequelize = require('sequelize');
const db = require('../db');

const Track = db.define('track', {
	trackUri: {
		type: Sequelize.STRING,
	},
});

module.exports = Track;
