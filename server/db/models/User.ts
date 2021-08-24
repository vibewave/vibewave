import { Model, Optional } from "sequelize";
const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const newErr = require('../../../utils/newErr');

export {};

const SALT_ROUNDS = 5;

interface UserAttributes {
  // username: {
  //   type: string,
  //   unique: boolean,
  //   allowNull: boolean,
  // },
  // password: {
  //   type: string,
  // },
  id: number,
  username: string,
  password: string,
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  createdAt?: Date,
  updatedAt?: Date,
}

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init({
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
  },
}, {
  tableName: 'user',
  db
});


module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd: string) {
	//we need to compare the plain version to an encrypted version of the password
	return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
	return jwt.sign({ id: this.id }, process.env.JWT);
};

interface UserInfo {
  username: string,
  password: string,
}

/**
 * classMethods
 */
User.authenticate = async function (userInfo: UserInfo) {
	const user = await this.findOne({ where: { username: userInfo.username } });
	if (!user || !(await user.correctPassword(userInfo.password))) {
    const error = newErr(401, 'Incorrect username/password');
		// const error = Error('Incorrect username/password');
		// error.status = 401;
		throw error;
	}
	return user.generateToken();
};

User.findByToken = async function (token: string) {
	try {
		const { id } = await jwt.verify(token, process.env.JWT);
		const user = User.findByPk(id);
		if (!user) {
			throw 'nooo';
		}
		return user;
	} catch (ex) {
    const error = newErr(401, 'bad token');
		// const error = Error('bad token');
		// error.status = 401;
		throw error;
	}
};



/**
 * hooks
 */
const hashPassword = async (user: UserInstance) => {
	//in case the password has been changed, we want to encrypt it with bcrypt
	if (user.changed('password')) {
		user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
	}
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users: UserInstance) => Promise.all(users.map(hashPassword)));
