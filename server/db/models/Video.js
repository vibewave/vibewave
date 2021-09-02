const Sequelize = require('sequelize');
const db = require('../db');

const Video = db.define('video', {
	videoId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	thumbnailUrl: {
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

module.exports = Video;
