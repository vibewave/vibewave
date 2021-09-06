import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	chatMessageContainer: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		width: '100%',
		// overflow: 'auto',
	},
}));

export default useStyles;
