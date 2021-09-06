import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	messageEntryContainer: {
		display: 'flex',
		alignContent: 'flex-end',
		height: '100%',
		width: '100%',
	},
	messageEntry: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
	},
	input: {
		height: '90%',
		width: '100%',
	},
	sendButton: {
		height: '3.9em',
		width: '0em',
	},
	sendIcon: {
		// height: '100%',
		// width: '1em',
	}
}));

export default useStyles;
