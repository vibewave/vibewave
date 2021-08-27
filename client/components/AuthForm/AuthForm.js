// import React, { useEffect } from 'react';
// import { connect, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { authenticate } from '../../store';

// /**
//  * COMPONENT
//  */
// export const Login = props => {
// 	// const { name, displayName, error } = props;
// 	const dispatch = useDispatch();

// 	const history = useHistory();

// 	const handleSubmit = async evt => {
// 		evt.preventDefault();
// 		const formName = 'login';
// 		const username = evt.target.username.value;
// 		const password = evt.target.password.value;
// 		let email = '';
// 		if (evt.target.email) {
// 			email = evt.target.email.value;
// 		}
// 		await dispatch(authenticate(username, password, email, formName));
// 		history.push('/spotify-login');
// 	};

// 	return (
// 		<div>
// 			<form onSubmit={handleSubmit} name={'login'}>
// 				<div>
// 					<label htmlFor="username">
// 						<small>Username</small>
// 					</label>
// 					<input name="username" type="text" />
// 				</div>
// 				<div>
// 					<label htmlFor="password">
// 						<small>Password</small>
// 					</label>
// 					<input name="password" type="password" />
// 				</div>
// 				<div>
// 					<button type="submit">Login</button>
// 				</div>
// 				{/* {error && error.response && <div> {error.response.data} </div>} */}
// 			</form>
// 		</div>
// 	);
// };

// export const Signup = props => {
// 	const { name, displayName, error } = props;
// 	const dispatch = useDispatch();

// 	const history = useHistory();

// 	const handleSubmit = async evt => {
// 		evt.preventDefault();
// 		const formName = 'signup';
// 		const username = evt.target.username.value;
// 		const password = evt.target.password.value;
// 		let email = '';
// 		if (evt.target.email) {
// 			email = evt.target.email.value;
// 		}
// 		await dispatch(authenticate(username, password, email, formName));
// 		history.push('/spotify-login');
// 	};

// 	return (
// 		<div>
// 			<form onSubmit={handleSubmit} name={'signup'}>
// 				<div>
// 					<label htmlFor="username">
// 						<small>Username</small>
// 					</label>
// 					<input name="username" type="text" />
// 				</div>
// 				<div>
// 					<label htmlFor="username">
// 						<small>Email</small>
// 					</label>
// 					<input name="email" type="text" />
// 				</div>
// 				<div>
// 					<label htmlFor="password">
// 						<small>Password</small>
// 					</label>
// 					<input name="password" type="password" />
// 				</div>
// 				<div>
// 					<button type="submit">{Signup}</button>
// 				</div>
// 				{/* {error && error.response && <div> {error.response.data} </div>} */}
// 			</form>
// 		</div>
// 	);
// };

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
// const mapLogin = state => {
// 	return {
// 		name: 'login',
// 		displayName: 'Login',
// 		error: state.auth.error,
// 	};
// };

// const mapSignup = state => {
// 	return {
// 		name: 'signup',
// 		displayName: 'Sign Up',
// 		error: state.auth.error,
// 	};
// };

// const mapDispatch = dispatch => {
// 	return {
// async handleSubmit(evt) {
// 	evt.preventDefault();
// 	const formName = evt.target.name;
// 	const username = evt.target.username.value;
// 	const password = evt.target.password.value;
// 	let email = '';
// 	if (evt.target.email) {
// 		email = evt.target.email.value;
// 	}
// 	await dispatch(authenticate(username, password, email, formName));
// 	history.push('/spotify-login');
// },
// 	};
// };

// export const Login = connect(mapLogin, mapDispatch)(AuthForm);
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
