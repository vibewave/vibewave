import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	videoSearchContainer: {
		marginLeft: '0.5em',
		marginTop: '0.5em',
		width: '60%',
	},
	videoSearchInput: {
		borderRadius: '0.5em',
		background: '#012F41',
		width: '100%',
	},
	songList: {
		height: '30em',
		width: '100%',
		overflow: 'auto',
	}
}));

export default useStyles;
