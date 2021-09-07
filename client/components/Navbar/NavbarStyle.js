import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	navBarContainer: {
		backgroundColor: '#012F41',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.8em',
		height: '65px',
		boxShadow: '0 4px 2px -2px rgba(0,0,0,.2)',
	},
	logoContainer: {
		color: 'white',
		alignSelf: 'center',
		marginLeft: '0.5em',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	logo: {
		height: '45px',
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
