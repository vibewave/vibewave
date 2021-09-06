import { socket } from '../../socket/socket';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import useStyles from './YouTubeSearchStyle';
import YouTubeSearchList from '../YouTubeSearchList/YouTubeSearchList';
import {
	addVideo,
	fetchVideos,
	addRequestedVideo,
	fetchRequestedVideos
} from '../../store';
import axios from 'axios';

const YouTubeSearch = () => {
	const classes = useStyles();
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [selectedVideo, setSelectedVideo] = useState({});
	const { id: roomId } = useParams();
	const dispatch = useDispatch();

	const handleSubmit = async event => {
		event.preventDefault();
		const { data: filteredVideoList } = await axios.post('/youtube/search', {
			search: search,
		});
		setSearchResult(filteredVideoList);
	};

	const chooseVideo = async video => {
		setSelectedVideo(video);
		await dispatch(addVideo(video, roomId));
		dispatch(fetchVideos(roomId));
		setSearch('');
		setSearchResult([]);
		socket.emit('video-added', parseInt(roomId, 10));
	};

	const chooseRequestedVideo = async video => {
		setSelectedVideo(video);
		await dispatch(addRequestedVideo(video, roomId));
		dispatch(fetchRequestedVideos(roomId));
		setSearch('');
		setSearchResult([]);
		socket.emit('requested-video-added', parseInt(roomId, 10));
	};

	return (
		<div className={classes.videoSearchContainer}>
			<form onSubmit={handleSubmit}>
				<TextField
					className={classes.videoSearchInput}
					inputProps={{}}
					label="Search a song."
					variant="outlined"
					value={search}
					onChange={e => setSearch(e.target.value)}
				></TextField>
			</form>
			<div className={classes.songList}>
				{searchResult.map(video => (
					<YouTubeSearchList
						video={video}
						key={video.id.videoId}
						chooseVideo={chooseVideo}
						chooseRequestedVideo={chooseRequestedVideo}
					/>
				))}
			</div>
		</div>
	);
};

export default YouTubeSearch;
