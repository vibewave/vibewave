import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	roomContainer: {
		width: '100%',
		height: '95%',
		backgroundColor: '#151A1C',
		color: '#fff'
	},
	mainGridContainer: {
		margin: '0',
		height: '100%',
	},
	roomCenter: {
		height: '100%',
	},
	roomCenterContainer: {
		height: '100%',
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'space-between',
		'align-items': 'center'
	},
	roomRight: {
		borderLeft: '1px solid white',
	},
	roomInfoDiv: {
		width: '100%',
		height: '12%',
		border: '1px solid #44494B',
	},
	mainArea: {
		width: '100%',
		height: '80%',
		border: '1px solid #44494B',
	},
	playerDiv: {
		width: '80%',
		border: '1px solid #44494B',
	},
}));

export default useStyles;
