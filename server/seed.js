const {
	db,
	models: { User, Room, Message, Video, FriendList },
} = require('./db');
const { users, rooms, videos, messages, friendLists } = require('./seedData');

const seed = async () => {
	try {
		if (process.env.NODE_ENV === 'production') {
			await db.sync({ force: true });
		} else {
			await db.sync({ force: true });
		}
		const userInstances = [];
		const roomInstances = [];
		const videoInstances = [];
		const messageInstances = [];
		const friendListInstances = [];

		//create users
		for (const userInstance of users) {
			try {
				const newUserInstance = await User.create(userInstance);
				userInstances.push(newUserInstance);
			} catch (err) {
				console.log(err);
			}
		}

		//create rooms
		for (const roomInstance of rooms) {
			try {
				const newRoomInstance = await Room.create(roomInstance);
				roomInstances.push(newRoomInstance);
			} catch (err) {
				console.log(err);
			}
		}

		//create messages
		for (const messageInstance of messages) {
			try {
				const newMessageInstance = await Message.create(messageInstance);
				messageInstances.push(newMessageInstance);
			} catch (err) {
				console.log(err);
			}
		}

		// create video
		for (const videoInstance of videos) {
			try {
				const newVideoInstance = await Video.create(videoInstance);
				videoInstances.push(newVideoInstance);
			} catch (err) {
				console.log(err);
			}
		}

		//create friendList
		for (const friendListInstance of friendLists) {
			try {
				const newFriendListInstance = await FriendList.create(
					friendListInstance
				);
				friendListInstances.push(newFriendListInstance);
			} catch (err) {
				console.log(err);
			}
		}

		//user-room associations
		try {
			await userInstances[0].setRoom(roomInstances[0]);
			await userInstances[1].setRoom(roomInstances[1]);
			await userInstances[2].setRoom(roomInstances[0]);
			await userInstances[3].setRoom(roomInstances[1]);
		} catch (err) {
			console.log(err);
		}
		//room-video associations
		try {
			await roomInstances[1].setVideos([videoInstances[0], videoInstances[1]]);
		} catch (err) {
			console.log(err);
		}
		//user-message associations
		try {
			await messageInstances[0].setUser(userInstances[0]);
			await messageInstances[1].setUser(userInstances[1]);
			await messageInstances[2].setUser(userInstances[2]);
		} catch (err) {
			console.log(err);
		}
		//room-message associations
		try {
			await messageInstances[0].setRoom(roomInstances[0]);
			await messageInstances[1].setRoom(roomInstances[1]);
			await messageInstances[2].setRoom(roomInstances[0]);
		} catch (err) {
			console.log(err);
		}
		//friendList associations
	} catch (err) {
		console.log(err);
	}
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
	seed()
		.then(() => {
			console.log('Seeding success!');
			db.close();
		})
		.catch(err => {
			console.error('Oh noes! Something went wrong!');
			console.error(err);
			db.close();
		});
}
