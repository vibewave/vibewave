import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Home from './components/Home/Home';
import SpotifyLogin from './components/SpotifyLogin/SpotifyLogin';
import Room from './components/Room/Room';

/**
 * COMPONENT
 */
const Routes = () => {
	return (
		<Switch>
			<Route path="/spotify-login">
				<SpotifyLogin />
			</Route>
			<Route exact path="/createroom">
				<CreateRoom />
			</Route>
			<Route exact path="/">
				<Home />
			</Route>
			<Route exact path="/room">
				<Room />
			</Route>
		</Switch>
	);
};

export default Routes;
