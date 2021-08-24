import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	roomContainer: {
		width: '100vw',
		height: '100vh',
		backgroundColor: '#151A1C',
	},
	mainGridContainer: {
		width: '100%',
		height: '100%',
	},
	roomLeft: {
		border: '1px solid white',
	},
	roomCenter: {
		border: '1px solid white',
	},
	roomRight: {
		border: '1px solid white',
	},
	centerSpace: {
		width: '100%',
		height: '100%',
	},
	roomInfoDiv: {
		width: '100%',
		border: '1px solid #44494B',
	},
	mainArea: {
		width: '100%',
		border: '1px solid #44494B',
	},
	playerDiv: {
		width: '100%',
		border: '1px solid #44494B',
	},
}));

export default useStyles;
