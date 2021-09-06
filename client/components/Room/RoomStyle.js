import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	roomContainer: {
		margin: '0',
		padding: '1em',
		width: '100vw',
		height: '90vh',
	},
	mainGridContainer: {
		height: '100%',
	},
	roomLeft: {
		height: '100%',
		// borderRight: '1.5px solid white',
		overflowY: 'auto'
	},
	videoQueueContainer: {
		height: '50%'
	},
	youTubeSearchContainer: {
		height: '45%'
	},
	chatContainer: {
		width: '100%',
		height: '100%',
	},
	roomCenterContainer: {
		height: '100%',
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'center',
		'align-items': 'center',
		padding: '0 1em',
	},
	roomCenter: {
		height: '100%',
	},
	roomInfoDiv: {
		width: '100%',
		height: '15%',
		border: '1px solid #44494B',
	},
	mainArea: {
		width: '100%',
		height: '30%',
		border: '1px solid #44494B',
		overflow: 'auto',
	},
	playerDiv: {
		width: '100%',
		border: '1px solid #44494B',
	},
	roomRight: {
		// borderLeft: '1.5px solid white',
		height: '100%',
	},
	chatContainer: {
		width: '100%',
		height: '100%',
	},
}));

export default useStyles;

