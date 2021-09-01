import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import TrackSearchResult from '../TrackSearchResult/TrackSearchResult';
import { addTrack } from '../../store/track';
import { fetchTracks } from '../../store/trackQueue';
import { useParams } from 'react-router-dom';
import useStyles from './TrackSearchStyle';
import { socket } from '../../socket/socket';

const trackAddedEmit = id => {
	console.log('on track added in the front end');
	id = parseInt(id, 10);
	socket.emit('track-added', id);
};

const TrackSearch = ({ spotifyApi }) => {
	const classes = useStyles();
	const [searchSongName, setSearchSongName] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [playingTrack, setPlayingTrack] = useState('');
	const accessToken = window.localStorage.getItem('accessToken');
	const dispatch = useDispatch();
	const { id } = useParams();

	// const [trackqueue, setTrackqueue] = useState([]);

	const chooseTrack = async track => {
		setPlayingTrack(track);
		await dispatch(addTrack(track, id));
		dispatch(fetchTracks(id));
		setSearchSongName('');
		trackAddedEmit(id);
		console.log(id);
		console.log('in choose track');
	};

	// const emitTrackAdded = () => {
	// socket emit trackAdded event
	// socket.on ('trackqueue updated), update the trackqueue local state
	// }

	useEffect(() => {
		if (!accessToken) return;
		spotifyApi.setAccessToken(accessToken);
	}, [accessToken]);

	useEffect(async () => {
		if (!searchSongName) return setSearchResults([]);
		if (!accessToken) return;

		let cancel = false;
		spotifyApi.searchTracks(searchSongName).then(res => {
			if (cancel) return;
			setSearchResults(
				res.body.tracks.items.map(track => {
					const smallestAlbumImage = track.album.images.reduce(
						(smallest, image) => {
							if (image.height < smallest.height) return image;
							return smallest;
						},
						track.album.images[0]
					);

					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						duration: track.duration_ms,
						albumUrl: smallestAlbumImage.url,
					};
				})
			);
		});
		return () => (cancel = true);
	}, [searchSongName, accessToken]);

	return (
		<div className={classes.trackSearchContainer}>
			<form>
				<TextField
					className={classes.trackSearchInput}
					inputProps={{ className: classes.trackSearchText }}
					label="Search a song."
					variant="outlined"
					value={searchSongName}
					onChange={e => setSearchSongName(e.target.value)}
				></TextField>
			</form>
			<div className={classes.songList}>
				{searchResults.map(track => (
					<TrackSearchResult
						track={track}
						key={track.uri}
						chooseTrack={chooseTrack}
						className={classes.songListItem}
					/>
				))}
			</div>
		</div>
	);
};

export default TrackSearch;
