const Sequelize = require('sequelize');
const db = require('../db');

const Video = db.define('video', {
	videoId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	videoUrl: {
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
	order: {
		type: Sequelize.INTEGER,
	},
	isRequested: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
});

module.exports = Video;
