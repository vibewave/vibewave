import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
	},
}));

export default useStyles;
