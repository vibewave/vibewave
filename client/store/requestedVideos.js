import axios from 'axios';

const FETCH_REQUESTED_VIDEOS = 'FETCH_REQUESTED_VIDEOS';

const _fetchRequestedVideos = requestedVideos => {
	return {
		type: FETCH_REQUESTED_VIDEOS,
		requestedVideos,
	};
};

export const fetchRequestedVideos = roomId => {
	return async dispatch => {
		const { data: requestedVideos } = await axios.get(`/api/videos/?roomId=${roomId}&isRequested=true`);
		dispatch(_fetchRequestedVideos(requestedVideos));
	};
};

export const removeRequestedVideo = (videoId, roomId) => {
	return async dispatch => {
		await axios.delete(`/api/videos/?videoId=${videoId}&isRequested=true`);
		dispatch(fetchRequestedVideos(roomId));
	};
};

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_REQUESTED_VIDEOS:
			return action.requestedVideos;
		default:
			return state;
	}
}
