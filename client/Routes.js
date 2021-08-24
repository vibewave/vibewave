import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Home from './components/Home/Home';
import SpotifyLogin from './components/SpotifyLogin/SpotifyLogin';

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
		</Switch>
	);
};

export default Routes;
