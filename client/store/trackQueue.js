import axios from 'axios';

const FETCH_TRACKS = 'FETCH_TRACKS';

const _fetchTracks = tracks => {
	return {
		type: FETCH_TRACKS,
		tracks,
	};
};

export const fetchTracks = roomId => {
	return async dispatch => {
		const { data: tracks } = await axios.get(`/api/tracks/${roomId}`);
		dispatch(_fetchTracks(tracks));
	};
};

export const removeTrack = (trackId, roomId) => {
	return async (dispatch) => {
		await axios.delete(`/api/tracks/${trackId}`);
		dispatch(fetchTracks(roomId));
	}
}

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_TRACKS:
			return action.tracks;
		default:
			return state;
	}
}