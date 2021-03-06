const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { JWT } = process.env;

const SALT_ROUNDS = 5;

const User = db.define('user', {
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true,
		validator: {
			isEmail: true,
		},
	},
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
	return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
	return jwt.sign({ id: this.id }, JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ email, password }) {
	const user = await this.findOne({ where: { email } });
	if (!user || !(await user.correctPassword(password))) {
		const error = Error('Incorrect username/password');
		error.status = 401;
		throw error;
	}
	return user.generateToken();
};

User.findByToken = async function (token) {
	try {
		const { id } = await jwt.verify(token, JWT);
		const user = User.findByPk(id);
		if (!user) {
			throw 'nooo';
		}
		return user;
	} catch (ex) {
		const error = Error('bad token');
		error.status = 401;
		throw error;
	}
};

/**
 * hooks
 */
const hashPassword = async user => {
	if (user.changed('password')) {
		user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
	}
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)));
