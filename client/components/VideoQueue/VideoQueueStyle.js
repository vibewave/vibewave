import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	videoQueueContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '0.1em',
	},
	videoQueueItemsContainer: {
		border: '0.5px solid white',
		borderRadius: '5px',
		display: 'flex',
		alignItems: 'center',
		alignSelf: 'flex-start',
		width: '100%',
		height: '5.5em',
		backgroundColor: '#151A1C',
		color: 'white',
		overflow: 'hidden',
		padding: '0.5em',
	},
	videoQueueDescription: {
		padding: '0.3em',
		height: '95%',
		'align-self': 'flex-start',
		overflowY: 'auto',
		overflowX: 'hidden',
		scrollbarWidth: 'thin',
		fontSize: '0.9em',
	},
	videoThumbnail: {
		width: '4em',
		height: '4em',
	},
}));

export default useStyles;
