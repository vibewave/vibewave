import axios from 'axios';

const FETCH_VIDEOS = 'FETCH_VIDEOS';

const _fetchVideos = videos => {
	return {
		type: FETCH_VIDEOS,
		videos,
	};
};

export const fetchVideos = roomId => {
	return async dispatch => {
		const { data: videos } = await axios.get(`/api/videos/${roomId}`);
		dispatch(_fetchVideos(videos));
	};
};

export const removeVideo = (videoId, roomId) => {
	return async (dispatch) => {
		await axios.delete(`/api/videos/${videoId}`);
		dispatch(fetchVideos(roomId));
	}
}

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_VIDEOS:
			return action.videos;
		default:
			return state;
	}
}
