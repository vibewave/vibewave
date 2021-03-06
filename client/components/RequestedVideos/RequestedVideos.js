import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRoom, fetchRequestedVideos, addRequestedVideoToQueue } from '../../store';
import useStyles from './RequestedVideosStyle';
import he from 'he';

const RequestedVideos = () => {
	const classes = useStyles();
	const roomId = parseInt(useParams().id, 10);
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth);
	const room = useSelector(state => state.room);
	let requestedVideos = useSelector(state => state.requestedVideos);

	useEffect(() => {
		dispatch(fetchRoom(roomId));
		dispatch(fetchRequestedVideos(roomId));
	}, []);

	const hostAddRequestedVideo = (video, roomId) => {
		if(room?.hostId === user?.id) {
			dispatch(addRequestedVideoToQueue(video, roomId));
		}
	}

	if (!requestedVideos) return <></>;
	return (
		<>
			<h4 className={classes.requestBoardHeader}>Request Board</h4>
			<div className={classes.requestedVideosContainer}>
				{requestedVideos.map(video => {
					const isHost = room?.hostId === user?.id;
					let requestedVideoItemClassName = isHost
					? classes.requestedVideoItemsContainer
					: classes.requestedVideoItemsContainerUser;
					return (
						<div
							key={video.id}
							className={requestedVideoItemClassName}
							onClick={() => hostAddRequestedVideo(video, roomId)}
						>
							<div>
								<img
									src={video.thumbnailUrl}
									className={classes.videoThumbnail}
								/>
							</div>
							<div className={classes.requestedVideoDescription}>
								{he.decode(video.title)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default RequestedVideos;
