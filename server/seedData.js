const users = [
	{
		username: 'peter',
		password: 'peter',
		email: 'peter@peter.com',
	},
	{
		username: 'jason',
		password: 'jason',
		email: 'jason@jason.com',
	},
	{
		username: 'andy',
		password: 'andy',
		email: 'andy@andy.com',
	},
	{
		username: 'tao',
		password: 'tao',
		email: 'tao@tao.com',
	},
];

const rooms = [
	{
		title: 'Jam Room',
		description: 'my room is so good',
		hostId: 1,
	},
	{
		title: 'Wow Room',
		description: 'my room is so good',
		hostId: 2,
	},
];

const messages = [
	{
		message: 'dang this app is cool',
	},
	{
		message: 'host has bad taste in music',
	},
	{
		message: 'is this message thing working?',
	},
];

const tracks = [
	{
		trackUri: '2gMXnyrvIjhVBUZwvLZDMP',
	},
	{
		trackUri: '4iJyoBOLtHqaGxP12qzhQI',
	},
];

const friendLists = [
	{
		requesterId: 1,
		recipientId: 2,
		confirmed: true,
	},
	{
		requesterId: 2,
		recipientId: 3,
		confirmed: false,
	},
	{
		requesterId: 3,
		recipientId: 1,
		confirmed: true,
	},
];

module.exports = {
	users,
	rooms,
	messages,
	tracks,
	friendLists,
};
