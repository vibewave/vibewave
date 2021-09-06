import axios from 'axios';

// Action Types
const CREATE_ROOM = 'CREATE_ROOM';
const FETCH_ROOM = 'FETCH_ROOM';
const LEAVE_ROOM = 'LEAVE_ROOM';

// Action Creators
const _createRoom = room => {
	return {
		type: CREATE_ROOM,
		room,
	};
};

const _fetchRoom = room => {
	return {
		type: FETCH_ROOM,
		room,
	};
};

const _leaveRoom = () => {
	return { type: LEAVE_ROOM };
};

// Thunks
export const createRoom = room => {
	return async dispatch => {
		try {
			const { data: dbRoom } = await axios.post('/api/rooms', room);
			const action = _createRoom(dbRoom);
			dispatch(action);
			return dbRoom;
		} catch (err) {
			window.alert('This room already exists!');
		}
	};
};

export const fetchRoom = roomId => {
	return async dispatch => {
		try {
			const { data: room } = await axios.get(`/api/rooms/${roomId}`);
			const action = _fetchRoom(room);
			dispatch(action);
		} catch (err) {
			console.log(err);
		}
	};
};

export const leaveRoom = (roomId, userId) => {
	return async dispatch => {
		await axios.put(`/api/users/${userId}`, { roomId: null });
		dispatch(_leaveRoom());
	};
};

export default function (state = {}, action) {
	switch (action.type) {
		case CREATE_ROOM:
			return action.room;
		case FETCH_ROOM:
			return action.room;
		case LEAVE_ROOM:
			return {};
		default:
			return state;
	}
}
