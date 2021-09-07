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
		border: `1px solid ${theme.palette.primary.light}`,
		borderRadius: '0.25em',
		overflow: 'hidden',
	},
	youTubeSearchContainer: {
		width: '95%',
		height: '45%',
		overflow: 'hidden',
		border: `1px solid ${theme.palette.primary.light}`,
		borderRadius: '0.25em',
		padding: '2px',
	},
	roomCenter: {
		height: '100%',
		padding: '3em 0 3em 0',
	},
	roomCenterContainer: {
		height: '100%',
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'flex-start',
		'align-items': 'center',
		padding: '0 1em',
	},
	roomInfoDiv: {
		width: '100%',
		height: '15%',
		minHeight: '7em',
	},
	mainArea: {
		width: '100%',
		height: '30%',
		minHeight: '9em',
		border: `1.5px solid #df6b78`,
		borderRadius: '0 0 0.25em 0.25em',
		overflow: 'hidden',
	},
	playerDiv: {
		width: '100%',
		borderLeft: `1px solid ${theme.palette.secondary.mix}`,
		borderRight: `1px solid ${theme.palette.secondary.mix}`,
		overflow: 'hidden',
	},
	roomRight: {
		height: '100%',
	},
	chatContainer: {
		width: '100%',
		height: '100%',
		border: `1px solid ${theme.palette.primary.light}`,
		borderRadius: '0.25em',
		padding: '2px',
		margin: '0 0 2px 2px',
	},
}));

export default useStyles;
