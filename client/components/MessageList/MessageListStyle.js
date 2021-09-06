import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '90%',
		overflow: 'auto',
		backgroundColor: theme.palette.secondary.mix,
		borderRadius: '5px',
	},

	bubble: {
		flexDirection: 'column',
		border: '0.5px solid white',
		borderRadius: '10px',
		margin: '5px',
		padding: '10px',
		display: 'inline-block',
		overflowAnchor: 'none',
	},
	last: {
		overflowAnchor: 'auto',
		height: '1px',
		textAlign: 'center',
	},
}));

export default useStyles;
