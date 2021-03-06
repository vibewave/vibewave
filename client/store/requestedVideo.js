import axios from 'axios';
import { socket } from '../socket/socket';
import { fetchVideos, fetchRequestedVideos } from '../store';

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
export const addRequestedVideo = (video, roomId) => {
	return async dispatch => {
		const { data: dbVideo } = await axios.post(`/api/videos`, {
			videoId: video.id.videoId,
			videoUrl: 'https://www.youtube.com/watch?v=' + video.id.videoId,
			title: video.snippet.title,
			thumbnailUrl: video.snippet.thumbnails.default.url,
			roomId,
      isRequested: true
		});
		const action = _addRequestedVideo(video);
		dispatch(action);
		return dbVideo;
	};
};

export const addRequestedVideoToQueue = (video, roomId) => {
	return async dispatch => {
		await axios.delete(`/api/videos/${video.id}`, {
			id: video.id,
		});
		const newVideo = {
			videoId: video.videoId,
			videoUrl: video.videoUrl,
			title: video.title,
			thumbnailUrl: video.thumbnailUrl,
			roomId,
			isRequested: false
		};
		const { data: dbVideo } = await axios.post(`/api/videos`, newVideo);
		dispatch(fetchVideos(roomId));
		dispatch(fetchRequestedVideos(roomId));
		socket.emit('video-added', roomId);
		socket.emit('requested-video-added', roomId);
	}
}

export default function (state = {}, action) {
	switch (action.type) {
		case ADD_REQUESTED_VIDEO:
			return action.requestedVideo;
		default:
			return state;
	}
}
