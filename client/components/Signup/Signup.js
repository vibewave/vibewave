import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authenticate } from '../../store';
import Copyright from '../Copyright/Copyright';
import useStyles from './SignupStyle';


const Signup = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);

	const emailValidation = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

	const passwordValidation = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~!@#$%^&*()\-_=+,.<>/?;:'"[{}\]\\|]).{8,30}$/;

	useEffect(() => {
		if (emailInput.length > 0) setIsEmailValid(true);
		if (passwordInput.length > 0) setIsPasswordValid(true);
	}, [emailInput, passwordInput]);

	const handleSubmit = async e => {
		e.preventDefault();
		const method = 'signup';

		const userInfo = {
			email: e.target.email.value.toLowerCase(),
			password: e.target.password.value,
			username: e.target.username.value.toLowerCase(),
		};

		// Email & Password Validation
		if (!emailValidation.test(userInfo.email)) {
			setIsEmailValid(false);
			userInfo.email = '';
		}

		if (!passwordValidation.test(userInfo.password)) {
			setIsPasswordValid(false);
			userInfo.password = '';
		}

		if (!userInfo.email.length || !userInfo.password.length) return;

		// User Validation
		const res = await dispatch(authenticate(method, userInfo));
		if (!res) {
			history.push('/');
		}
		else {
			window.alert(res.auth.error.response.data);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<img src="/vibewave-logo.png" alt="vibewave logo" className={classes.logo}/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={emailInput}
						onChange={(e) => setEmailInput(e.target.value)}
						autoFocus
					/>
					{!isEmailValid && <p className={classes.inputError}>Email address is in incorrect form.</p>}
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={passwordInput}
						onChange={(e) => setPasswordInput(e.target.value)}
					/>
					{!isPasswordValid && <p className={classes.inputError}>{`Password must contain number, lowercase & uppercase letters, symbols, and between 8 ~ 30 characters long.`}</p>}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Link href={'/login'}>
								{"Already have an account? Login"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default Signup;
