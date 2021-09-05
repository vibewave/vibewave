import axios from 'axios';

// Action Types
const FETCH_HOST = 'FETCH_HOST';

// Action Creators
const _fetchHost = user => ({ type: FETCH_HOST, user });

// Thunk Creators
export const fetchHost = (roomId) => async dispatch => {
	const { data: host } = await axios.get(`/api/host/${roomId}`);
  dispatch(_fetchHost(host));
};

// host Reducer
export default function (state = {}, action) {
	switch (action.type) {
		case FETCH_HOST:
			return action.user;
		default:
			return state;
	}
};
