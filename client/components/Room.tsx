import React, {useState, useEffect} from 'react'
import { socket } from '../socket/socket'
import {
  makeStyles,
  Container,
  Grid,
  Button,
  Link
} from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-node';
import Player from './Player';

const useStyles = makeStyles((theme) => ({
  roomContainer: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#151A1C'
  },
  mainGridContainer: {
    width: '100%',
    height: '100%'
  },
  roomLeft: {
    border: '1px solid white'
  },
  roomCenter: {
    border: '1px solid white'
  },
  roomRight: {
    border: '1px solid white'
  },
  centerSpace: {
    width: '100%',
    height: '100%'
  },
  roomInfoDiv: {
    width: '100%',
    border: '1px solid #44494B'
  },
  mainArea: {
    width: '100%',
    border: '1px solid #44494B'
  },
  playerDiv: {
    width: '100%',
    border: '1px solid #44494B'
  },
}));

const spotifyApi = new SpotifyWebApi({
  clientId: 'a28a1d73e5f8400485afaff5e584ca32'
});

const authCode: string = new URLSearchParams(window.location.search).get("code") ?? '';

export default function Room() {
  const classes = useStyles();

  const [isHost, setIsHost] = useState(false);
  const [currentTimePosition, setCurrentTimePosition] = useState(0);

	socket.on('isHost', () => {
		setIsHost(true);
		console.log('isHost after connect is ', isHost);
	});

	const startSong = () => {
		console.log('start song button clicked.');
		socket.emit('song-started', true);
	};

	const joinRoom = () => {
		console.log('join room button clicked.');
		socket.emit('join-room');
	};

	socket.on('time-position', (counter: number) => {
		console.log('inside time-position client for user ', socket.id);
		console.log(`Current time: ${counter}`);
		setCurrentTimePosition(counter);
	});

  return (
    <Container component="div" disableGutters={true} maxWidth={false} className={classes.roomContainer}>
      {isHost && "I am the host"}
      {!isHost && "I am not the host"}
      <button onClick={startSong}>Start Song</button>
      <button onClick={joinRoom}>Join Room</button>
      <div>{currentTimePosition}</div>
      <Grid container
        spacing={3}
        className={classes.mainGridContainer}
      >
        <Grid item xs={2} className={classes.roomLeft}>
        </Grid>
        <Grid item xs={7} className={classes.roomCenter}>
          <Grid container
            direction="column"
            alignItems="center"
            className={classes.centerSpace}>
              <Grid item xs={2} className={classes.roomInfoDiv}>
              </Grid>
              <Grid item xs={8} className={classes.mainArea}>
              </Grid>
              <Grid item xs={2} className={classes.playerDiv}>
                {/* <Player /> */}
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.roomRight}>
        </Grid>
      </Grid>
    </Container>
  )
}
