import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	navBarContainer: {
		backgroundColor: '#012F41',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.8em',
	},

	logoContainer: {
		color: 'white',
		alignSelf: 'center',
		marginLeft: '0.5em',
	},

	createRoomContainer: {
		color: 'white',
		marginRight: '1.0em',
	},

	createRoomButton: {
		border: 'solid 0.2em white',
	},

	menuButtonAndUsername: {
		display: 'flex',
		marginRight: '0.5em',
		alignItems: 'center',
	},

	userContainer: {
		paddingRight: '0.5em',
		color: 'white',
	},
}));

export default useStyles;
