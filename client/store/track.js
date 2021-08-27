import axios from 'axios';

//Action types

const ADD_TRACK = 'ADD_TRACK';

//Action creators

const _addTrack = track => {
	return {
		type: ADD_TRACK,
		track,
	};
};

//Thunks

export const addTrack = (track, roomId) => {
	return async dispatch => {
		const { data: dbTrack } = await axios.post(`/api/tracks`, {
			trackUri: track.uri,
			roomId,
		});
		const action = _addTrack(track);
		dispatch(action);
		return dbTrack;
	};
};

export default function (state = {}, action) {
	switch (action.type) {
		case ADD_TRACK:
			return action.track;
		default:
			return state;
	}
}
