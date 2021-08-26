import axios from 'axios';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const EXPIRES_IN = 'expiresIn';
//Action Types

const SET_SPOTIFY_AUTH = 'SET_SPOTIFY_AUTH';

//Action Creators

const setSpotifyAuth = spotifyAuth => {
	return {
		type: SET_SPOTIFY_AUTH,
		spotifyAuth,
	};
};

export const spotifyAuthenticate = authCode => {
	return async dispatch => {
		try {
			const { data } = await axios.post(`/spotify/login`, {
				code: authCode,
			});
			window.localStorage.setItem(
				ACCESS_TOKEN,
				data.accessToken
			);
			window.localStorage.setItem(
				REFRESH_TOKEN,
				data.refreshToken
			);
			window.localStorage.setItem(EXPIRES_IN, data.expiresIn);

			// console.log(window.localStorage.getItem(ACCESS_TOKEN));
			// console.log(window.localStorage.getItem(REFRESH_TOKEN));
			// console.log(window.localStorage.getItem(EXPIRES_IN));

			window.localStorage.setItem('spotifyAuthCode', 'authenticated');
			// console.log('authCode: ', window.localStorage.getItem('spotifyAuthCode'));

			// window.localStorage.removeItem('spotifyAuthCode');
			// window.localStorage.setItem('authWithSpotify', 'true');

			dispatch(
				setSpotifyAuth({
					accessToken: window.localStorage.getItem(ACCESS_TOKEN),
					refreshToken: window.localStorage.getItem(REFRESH_TOKEN),
					expiresIn: window.localStorage.getItem(EXPIRES_IN),
				})
			);
		} catch (err) {
			console.log(err);
		}
	};
};

// export const reAuthenticate = authCode => {
// 	return async dispatch => {
// 		try {
// 			const refreshToken = window.localStorage.getItem(REFRESH_TOKEN);
// 			const { data }  = await axios.post(`http://localhost:3032/spotify/refresh`, {refreshToken});
// 			setAccessToken(data.accessToken);
// 			setExpiresIn(data.expiresIn);
// 		}
// 		catch {
// 			window.location.href = '/';
// 		}
// 	}
// }


const initialState = {
	accessToken: window.localStorage.getItem(ACCESS_TOKEN),
	refreshToken: window.localStorage.getItem(ACCESS_TOKEN),
	expiresIn: window.localStorage.getItem(ACCESS_TOKEN)
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_SPOTIFY_AUTH:
			return action.spotifyAuth;
		default:
			return state;
	}
};
