import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	messageEntry: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		borderTop: `1px solid ${theme.palette.primary.light}`,
		paddingTop: '2px',
	},
	input: {
		height: '90%',
		width: '100%',
	},
	sendButton: {
		height: '3.9em',
		width: '0em',
	},
}));

export default useStyles;
