import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  videoQueueHeader: {
    textAlign: 'center',
		color: theme.palette.primary.light,
		margin: '0.25em 0 0.25em 0'
  },
  videoQueueContainer: {
		width: '100%',
		height: '95%',
		overflow: 'auto',
		paddingBottom: '1em'
	},
	videoQueue: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '0.1em',
	},
	videoQueueItemsContainer: {
		border: `1px solid ${theme.palette.secondary.light}`,
		borderRadius: '5px',
		display: 'flex',
		alignItems: 'center',
		alignSelf: 'flex-start',
		width: '95%',
		height: '5.5em',
		backgroundColor: '#151A1C',
		color: 'white',
		overflow: 'hidden',
		padding: '0.5em',
    margin: '0 0 2.5% 2.5%',
	},
	videoQueueDescription: {
		padding: '0.3em 0.3em 0.3em 0.8em',
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
