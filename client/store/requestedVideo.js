import axios from 'axios';

//Action types
const ADD_REQUESTED_VIDEO = 'ADD_REQUESTED_VIDEO';

//Action creators
const _addRequestedVideo = requestedVideo => {
	return {
		type: ADD_REQUESTED_VIDEO,
		requestedVideo,
	};
};

//Thunks
export const addRequestedVideo = (requestedVideo, roomId) => {
	return async dispatch => {
		const { data: dbVideo } = await axios.post(`/api/videos`, {
			videoId: video.id.videoId,
			videoUrl: 'https://www.youtube.com/watch?v=' + video.id.videoId,
			title: video.snippet.title,
			thumbnailUrl: video.snippet.thumbnails.default.url,
			roomId,
      isRequested: true
		});
		const action = _addRequestedVideo(requestedVideo);
		dispatch(action);
		return dbVideo;
	};
};

export default function (state = {}, action) {
	switch (action.type) {
		case ADD_REQUESTED_VIDEO:
			return action.requestedVideo;
		default:
			return state;
	}
}
