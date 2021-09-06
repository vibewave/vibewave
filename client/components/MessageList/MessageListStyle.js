import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	messageListContainer: {
		height: '90%',
		width: '100%',
		marginBottom: '2%',
		overflowY: 'scroll',
		overScrollBehaviorY: 'contain',
		scrollSnapType: 'y proximity',
	},
	messageList: {
		display: 'flex',
		flexDirection: 'column',
		width: '99%',
		scrollSnapAlign: 'end',
		// backgroundColor: theme.palette.secondary.mix,
		borderRadius: '5px',
	},
	bubble: {
		backgroundColor: '#23494B',
		border: '0.1em solid gray',
		borderRadius: '0.75em',
		margin: '0.1em',
		padding: '0.5em',
		width: '100%',
	},
	bubbleMine: {
		backgroundColor: '#30a2a9',
		border: '0.1em solid #c3d3d4',
		borderRadius: '0.75em',
		margin: '0.1em',
		padding: '0.5em',
		width: '100%',
	},
	last: {
		overflowAnchor: 'auto',
		height: '1em',
		textAlign: 'center',
		position: 'absolute',
	},
}));

export default useStyles;
