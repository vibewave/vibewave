import axios from 'axios';
import { fetchRooms } from '../store';

// Action Types
const FETCH_USERS = 'FETCH_USERS';

// Action Creators
const _fetchUsers = users => {
	return {
		type: FETCH_USERS,
		users,
	};
};

// Thunks
export const fetchUsers = roomId => {
	return async dispatch => {
		const { data: { users: users } } = await axios.get(`/api/rooms/${roomId}`);
		const action = _fetchUsers(users);
		console.log('users: ', users);
		dispatch(action);
	};
};

export const handleEnterRoom = (roomId, userId, history) => {
	return async dispatch => {
		await axios.put(`/api/users/${userId}`, { roomId });
		history.push(`/rooms/${roomId}`);
		dispatch(fetchUsers(roomId));
	};
};

export const hostLeaveAndDeleteRoom = (roomId, history) => {
	return async dispatch => {
		history.push('/');
		await axios.delete(`/api/rooms/${roomId}`);
		await dispatch(fetchRooms());
	};
};

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_USERS:
			return action.users;
		default:
			return state;
	}
}
