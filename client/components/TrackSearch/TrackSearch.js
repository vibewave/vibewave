import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import TrackSearchResult from '../TrackSearchResult/TrackSearchResult';
import { addTrack } from '../../store/track';
import { useParams } from 'react-router-dom';

const TrackSearch = ({ spotifyApi }, props) => {
	const [searchSongName, setSearchSongName] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [playingTrack, setPlayingTrack] = useState('');
	const accessToken = window.localStorage.getItem('accessToken');
	const dispatch = useDispatch();
	const { id } = useParams();

	console.log('roomId', id);

	const chooseTrack = track => {
		setPlayingTrack(track);
		dispatch(addTrack(track, id));
		setSearchSongName('');
	};

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
					console.log('track', track);
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
						albumUrl: smallestAlbumImage.url,
					};
				})
			);
		});
		return () => (cancel = true);
	}, [searchSongName, accessToken]);

	return (
		<div>
			<form>
				<TextField
					id="outlined-basic"
					label="SongSearch"
					variant="outlined"
					value={searchSongName}
					onChange={e => setSearchSongName(e.target.value)}
				></TextField>
			</form>
			<div className="songlist" style={{ overflow: 'auto' }}>
				{searchResults.map(track => (
					<TrackSearchResult
						track={track}
						key={track.uri}
						chooseTrack={chooseTrack}
					/>
				))}
			</div>
		</div>
	);
};

export default TrackSearch;
