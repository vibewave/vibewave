import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	messageEntryContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	messageEntry: {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		borderTop: `1px solid ${theme.palette.primary.light}`,
		paddingTop: '2px',
		overflow: 'hidden',
	},
	input: {
		height: '100%',
		width: '80%',
	},
	sendButton: {
		height: '3.9em',
		width: '20%',
	},
}));

export default useStyles;
