import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	navBarContainer: {
		backgroundColor: '#012F41',
		marginTop: '-0.5em',
		marginLeft: '-0.5em',
		marginRight: '-0.5em',
		display: 'flex',
		justifyContent: 'space-between',
	},

	logoContainer: {
		color: 'white',
		padding: '0.2em',
	},

	createRoomContainer: {
		color: 'white',
		padding: '0.2em',
		marginRight: '0.2em',
	},

	createRoomButton: {
		border: 'solid 0.2em white',
	},
}));

export default useStyles;
