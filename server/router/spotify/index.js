const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const router = express.Router();
const { models: { User }} = require('../../db');
const changeErrStatus = require('../../utils/changeErrStatus');
module.exports = router;

// POST /spotify/login
router.post('/login', async (req, res, next) => {
  try {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    const { body } = await spotifyApi.authorizationCodeGrant(code);
    const accessToken = body.access_token;
    const refreshToken = body.refresh_token;
    const expiresIn = body.expires_in;

    res.json({
      accessToken,
      refreshToken,
      expiresIn
    });
  } catch (err) {
    console.log(err.stack);
    next(changeErrStatus(400, err));
  }
});

// POST /spotify/refresh
router.post('/refresh', async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    });

    const { body } = await spotifyApi.refreshAccessToken();
    const accessToken = body.access_token;
    const expiresIn = body.expires_in;

    res.json({
      accessToken,
      expiresIn
    });
  } catch (err) {
    console.log(err.stack);
    next(changeErrStatus(400, err));
  }
});
