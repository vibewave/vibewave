const Sequelize = require('sequelize');
const db = require('../db');

const FriendList = db.define('friendList', {
	confirmed: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = FriendList;
