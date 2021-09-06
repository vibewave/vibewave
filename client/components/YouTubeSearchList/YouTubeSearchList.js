import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useStyles from './YouTubeSearchListStyle';
import { fetchUsers, fetchRoom } from '../../store';
import he from 'he';

const YouTubeSearchList = props => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const roomId = parseInt(useParams().id, 10);
	const room = useSelector(state => state.room);
	const user = useSelector(state => state.auth);

	const { video, chooseVideo, chooseRequestedVideo } = props;

	useEffect(async () => {
		await dispatch(fetchRoom(roomId));
		await dispatch(fetchUsers(roomId));
	}, []);

	const handleSelectedVideo = () => {
		if (room?.hostId === user?.id) {
			chooseVideo(video);
		} else {
			chooseRequestedVideo(video);
		}
	};

	return (
		<div
			className={classes.searchResultItemsContainer}
			onClick={handleSelectedVideo}
		>
			<div className={classes.thumbnailImgContainer}>
				<img
					src={video.snippet.thumbnails.default.url}
					className={classes.thumbnailImg}
				/>
			</div>
			<div className={classes.videoDescription}>
				<h4>{he.decode(video.snippet.title)}</h4>
			</div>
		</div>
	);
};

export default YouTubeSearchList;
