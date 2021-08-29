import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	roomContainer: {
		margin: '0',
		padding: '1em',
		width: '100%',
		height: '90%',
	},
	mainGridContainer: {
		margin: '0',
		height: '100%',
	},
	roomCenterContainer: {
		height: '100%',
		display: 'flex',
		'flex-direction': 'column',
		'justify-content': 'space-between',
		'align-items': 'center'
	},
	roomInfoDiv: {
		width: '90%',
		height: '12%',
		border: '1px solid #44494B',
	},
	mainArea: {
		width: '90%',
		height: '80%',
		border: '1px solid #44494B',
	},
	playerDiv: {
		width: '80%',
		border: '1px solid #44494B',
	},
	roomRight: {
		borderLeft: '1px solid white',
	},
	chatContainer: {
		width: '100%',
		height: '100%',
	}
}));

export default useStyles;
