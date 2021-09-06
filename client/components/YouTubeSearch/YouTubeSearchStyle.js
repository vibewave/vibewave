import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	videoSearchContainer: {
		marginLeft: '0.5em',
		marginTop: '0.5em',
		width: '100%',
	},
	videoSearchInput: {
		borderRadius: '0.5em',
		background: '#012F41',
		width: '95%',
	},
	songList: {
		height: '100%',
		width: '95%',
		overflow: 'auto',
	}
}));

export default useStyles;
