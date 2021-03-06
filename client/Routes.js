import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { me } from './store';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Room from './components/Room/Room';
import Fallback from './Fallback';

const Routes = () => {
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(async () => {
		dispatch(me());
	}, []);

	useEffect(async () => {
		setIsLoggedIn(!!auth.id);
	}, [auth]);

	return (
		<>
			{isLoggedIn ? (
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/createroom">
						<CreateRoom />
					</Route>
					<Route exact path="/rooms/:id">
						<Room />
					</Route>
					<Route exact path="/home">
						<Redirect to="/" />
					</Route>
					<Route>
						<Fallback />
					</Route>
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
					<Route>
						<Fallback />
					</Route>
				</Switch>
			)}
		</>
	);
};

export default Routes;
