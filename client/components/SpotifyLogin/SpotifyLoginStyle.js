import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	spotifyLoginContainer: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#151A1C'
	},
	spotifyLoginBtn: {
		backgroundColor: '#1DB954',
		color: '#fff',
		cursor: 'pointer',
	},
}));

export default useStyles;
