import axios from 'axios';

//action types
const SET_ROOMS = 'SET_ROOMS';

//action creators
export const setRooms = rooms => {
	return {
		type: SET_ROOMS,
		rooms,
	};
};

export const fetchRooms = () => {
	return async dispatch => {
		const { data: rooms } = await axios.get('/api/rooms');
		dispatch(setRooms(rooms));
	};
};

export default function (state = [], action) {
	switch (action.type) {
		case SET_ROOMS:
			return action.rooms;
		default:
			return state;
	}
}
