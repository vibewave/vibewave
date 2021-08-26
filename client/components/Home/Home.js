import React, { useEffect } from 'react';
import AllRooms from '../AllRooms/AllRooms';
import { useDispatch } from 'react-redux';
import { spotifyAuthenticate } from '../../store/spotifyAuth';


const Home = () => {
	const dispatch = useDispatch();
	const authCode = window.localStorage.getItem('spotifyAuthCode');
	const authWithSpotify = window.localStorage.getItem('authWithSpotify');

	useEffect(() => {
		if (authCode && authWithSpotify !== 'true') {
			dispatch(spotifyAuthenticate(authCode));
		}
	}, [authCode]);

	return (
		<div>
			<AllRooms />
		</div>
	);
};

export default Home;
