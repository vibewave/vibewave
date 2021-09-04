import axios from 'axios';

//Action types

const ADD_VIDEO = 'ADD_VIDEO';

//Action creators

const _addVideo = video => {
	return {
		type: ADD_VIDEO,
		video,
	};
};

//Thunks

export const addVideo = (video, roomId) => {
	return async dispatch => {
		const { data: dbVideo } = await axios.post(`/api/videos`, {
			videoId: video.id.videoId,
			videoUrl: 'https://www.youtube.com/watch?v=' + video.id.videoId,
			title: video.snippet.title,
			thumbnailUrl: video.snippet.thumbnails.default.url,
			roomId,
		});
		const action = _addVideo(video);
		dispatch(action);
		return dbVideo;
	};
};

export default function (state = {}, action) {
	switch (action.type) {
		case ADD_VIDEO:
			return action.video;
		default:
			return state;
	}
}
