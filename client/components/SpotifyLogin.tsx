import React from 'react';
import {
  makeStyles,
  Container,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  spotifyLoginContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid blue',
  },
  spotifyLoginBtn: {
    backgroundColor: '#37b954',
    color: '#fff',
    cursor: 'pointer',
  }
}));

const clientId = 'a28a1d73e5f8400485afaff5e584ca32';
const responseType = 'code';
const redirectUri = process.env.NODE_ENV === 'production'
                    ? 'https://vibewave.herokuapp.com'
                    : 'http://localhost:3032';
const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state'
];
const scopeParam: string = scopes.join('%20');


const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopeParam}`;


export default function Login() {
  const classes = useStyles();

  return (
    <Container component="div" disableGutters={true} maxWidth={false} className={classes.spotifyLoginContainer}>
      <a href={AUTH_URL}>
        <Button variant="contained" className={classes.spotifyLoginBtn}>
        Login with Spotify
        </Button>
      </a>
    </Container>
  )
}
