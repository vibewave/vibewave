const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const router = express.Router();
const {
	models: { User },
} = require('../../db');
const changeErrStatus = require('../../utils/changeErrStatus');
const { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } = process.env;
module.exports = router;

// POST /spotify/login
router.post('/login', async (req, res, next) => {
	try {
		console.log('redirect ', REDIRECT_URI);
		console.log('Id ', CLIENT_ID);
		console.log('secret ', CLIENT_SECRET);
		const code = req.body.code;
		const spotifyApi = new SpotifyWebApi({
			redirectUri: REDIRECT_URI,
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
		});

		const { body } = await spotifyApi.authorizationCodeGrant(code);
		const accessToken = body.access_token;
		const refreshToken = body.refresh_token;
		const expiresIn = body.expires_in;

		res.json({
			accessToken,
			refreshToken,
			expiresIn,
		});
	} catch (err) {
		console.log(err.stack);
		next(changeErrStatus(400, err));
	}
});

// POST /spotify/refresh
router.post('/refresh', async (req, res, next) => {
	try {
		const refreshToken = req.body.refreshToken;
		const spotifyApi = new SpotifyWebApi({
			redirectUri: REDIRECT_URI,
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			refreshToken,
		});

		const { body } = await spotifyApi.refreshAccessToken();
		const accessToken = body.access_token;
		const expiresIn = body.expires_in;

		res.json({
			accessToken,
			expiresIn,
		});
	} catch (err) {
		console.log(err.stack);
		next(changeErrStatus(400, err));
	}
});
