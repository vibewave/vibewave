const db = require('./db');
const User = require('./models/User');
const Room = require('./models/Room');
const Track = require('./models/Track');
const Message = require('./models/Message');
const FriendList = require('./models/FriendList');

//associations could go here!

Room.hasMany(User);
User.belongsTo(Room);

User.hasMany(Message);
Message.belongsTo(User, { foreignKey: 'userId' });
Room.hasMany(Message);
Message.belongsTo(Room, { foreignKey: 'roomId' });

Room.hasMany(Track);
Track.belongsTo(Room);

User.belongsToMany(User, {
	through: FriendList,
	as: 'requester',
	foreignKey: 'requesterId',
});
User.belongsToMany(User, {
	through: FriendList,
	as: 'recipient',
	foreignKey: 'recipientId',
});

module.exports = {
	db,
	models: {
		User,
		Room,
		Track,
		Message,
		FriendList,
	},
};
