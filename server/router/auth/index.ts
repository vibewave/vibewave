import express, {NextFunction, Request, Response} from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
const router = express.Router();
// const { models: { User }} = require('../../db');
const changeErrStatus = require('../../utils/changeErrStatus');
module.exports = router;

// POST /auth/login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI || 'http://localhost:3032',
      clientId: process.env.CLIENT_ID || 'a28a1d73e5f8400485afaff5e584ca32',
      clientSecret: process.env.CLIENT_SECRET || '1526d681970b49c98bbfd53d5071d9b1',
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

// POST /auth/refresh
router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI || 'http://localhost:3032',
      clientId: process.env.CLIENT_ID || 'a28a1d73e5f8400485afaff5e584ca32',
      clientSecret: process.env.CLIENT_SECRET || '1526d681970b49c98bbfd53d5071d9b1',
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
