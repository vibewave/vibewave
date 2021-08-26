import React, { useEffect } from 'react';
import AllRooms from '../AllRooms/AllRooms';
import { useDispatch } from 'react-redux';
import { spotifyAuthenticate } from '../../store/spotifyAuth';


const Home = () => {
	const dispatch = useDispatch();
	const authCode = window.localStorage.getItem('spotifyAuthCode');

	useEffect(() => {
		if (authCode && authCode !== 'authenticated') {
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
