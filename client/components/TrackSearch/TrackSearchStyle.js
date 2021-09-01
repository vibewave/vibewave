import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	trackSearchContainer: {
		marginLeft: '0.5em',
		marginTop: '0.5em',
	},
	trackSearchInput: {
		borderRadius: '0.5em',
		background: '#012F41',
		width: '25em',
	},
	trackSearchText: {
		color: 'white',
	},
	songList: {
		height: '35em',
		width: '25em',
		overflow: 'auto',
	}
}));

export default useStyles;
