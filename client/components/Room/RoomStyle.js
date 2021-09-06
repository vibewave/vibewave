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
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	videoQueueContainer: {
		marginBottom: '1em',
		width: '95%',
		height: '55%',
		overflow: 'auto',
	},
	youTubeSearchContainer: {
		width: '95%',
		height: '40%',
		overflow: 'hidden',
	},
	roomCenterContainer: {
		height: '100%',
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'flex-start',
		'align-items': 'center',
		padding: '0 1em',
	},
	roomCenter: {
		height: '100%',
	},
	roomInfoDiv: {
		width: '100%',
		height: '15%',
		// border: '1px solid #44494B',
	},
	mainArea: {
		width: '100%',
		height: '30%',
		border: `1.5px solid #df6b78`,
		borderRadius: '0 0 0.25em 0.25em',
		overflow: 'auto',
	},
	playerDiv: {
		width: '100%',
		// border: '1px solid #44494B',
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
