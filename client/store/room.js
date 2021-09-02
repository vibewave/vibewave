import axios from 'axios';

// Action Types
const CREATE_ROOM = 'CREATE_ROOM';

// Action Creators
const _createRoom = room => {
	return {
		type: CREATE_ROOM,
		room,
	};
};

// Thunks
export const createRoom = room => {
	return async dispatch => {
		const { data: dbRoom } = await axios.post('/api/rooms', room);
		const action = _createRoom(dbRoom);
		dispatch(action);
		return dbRoom;
	};
};

export default function (state = {}, action) {
	switch (action.type) {
		case CREATE_ROOM:
			return action.room;
		default:
			return state;
	}
}
