import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authenticate } from '../../store';
import Copyright from '../Copyright/Copyright';
import useStyles from './LoginStyle';

const Login = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async e => {
		e.preventDefault();
		const method = 'login';
		const userInfo = {
			email: e.target.email.value,
			password: e.target.password.value,
		};

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
					<img
						src="/vibewave-logo.png"
						alt="vibewave logo"
						className={classes.logo}
					/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
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
						autoFocus
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
					/>
					{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Login
					</Button>
					<Grid container justifyContent="center">
						{/* <Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid> */}
						<Grid item>
							<Link href={'/signup'}>{"Don't have an account? Sign Up"}</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Login;
