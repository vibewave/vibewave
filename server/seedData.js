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
		trackUri: 'spotify:track:4ZtFanR9U6ndgddUvNcjcG',
		title: 'good 4 u',
		artist: 'Olivia Rodrigo',
		albumUrl: 'https://i.scdn.co/image/ab67616d00004851a91c10fe9472d9bd89802e5a',
		duration: '178146',
	},
	{
		trackUri: 'spotify:track:5HCyWlXZPP0y6Gqq8TgA20',
		title: 'STAY (with Justin Bieber)',
		artist: 'The Kid LA ROI',
		albumUrl: 'https://i.scdn.co/image/ab67616d0000485141e31d6ea1d493dd77933ee5',
		duration: '141805',
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
