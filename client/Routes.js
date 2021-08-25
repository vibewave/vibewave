import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Home from './components/Home/Home';
import SpotifyLogin from './components/SpotifyLogin/SpotifyLogin';
import { Login, Signup } from './components/AuthForm/AuthForm';
import AuthTest from './components/AuthForm/AuthTest';
import Room from './components/Room/Room';
import { useDispatch, useSelector } from 'react-redux';
import { me } from './store';
/**
 * COMPONENT
 */
const Routes = () => {
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(async () => {
		dispatch(me());
	}, []);

	useEffect(async () => {
		setIsLoggedIn(!!auth.id);
		console.log(isLoggedIn);
	}, [auth]);

	return (
		<div>
			{isLoggedIn ? (
				<Switch>
					<Route path="/spotify-login">
						<SpotifyLogin />
					</Route>
					<Route exact path="/createroom">
						<CreateRoom />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/signup">
						<Signup />
					</Route>
					<Route exact path="/rooms/:id">
						<Room />
					</Route>
					<Route exact path="/home">
						<Home />
					</Route>
					<Redirect to="/home" />
				</Switch>
			) : (
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/signup">
						<Signup />
					</Route>
				</Switch>
			)}
		</div>
	);
};

export default Routes;
