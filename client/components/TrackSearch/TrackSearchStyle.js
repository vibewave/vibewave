import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	trackSearchContainer: {
		marginLeft: '0.5em',
		marginTop: '0.5em',
	},
	trackSearchInput: {
		borderRadius: '0.5em',
		background: '#012F41',
	},
	trackSearchText: {
		color: 'white',
	},
	songList: {
		height: '20em',
		width: '28em',
		overflow: 'auto',
	}
}));

export default useStyles;
