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

const videos = [
	{
		videoId: 'oiNkumxPVzU',
		videoUrl: 'https://www.youtube.com/watch?v=oiNkumxPVzU',
		title:
			"RED VELVET - 'FUTURE' (미래) [Start-Up OST Part.1] Lyrics [Color Coded_Han_Rom_Eng]",
		thumbnailUrl: 'https://i.ytimg.com/vi/oiNkumxPVzU/maxresdefault.jpg',
		isRequested: false
	},
	{
		videoId: 'kTJczUoc26U',
		videoUrl: 'https://www.youtube.com/watch?v=kTJczUoc26U',
		title: 'The Kid LAROI, Justin Bieber - STAY (Official Video)',
		thumbnailUrl:
			'https://themusicnetwork.com/wp-content/uploads/The-Kid-LAROI-and-Justin-Bieber-Stay-1024x657.png',
		isRequested: false
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
	videos,
	friendLists,
};
