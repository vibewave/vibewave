import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	videoSearchContainer: {
		width: '98%',
		height: '100%',
	},
	videoSearchInput: {
		borderRadius: '0.5em',
		background: '#012F41',
		width: '100%',
	},
	songList: {
		width: '100%',
		height: '100%',
		borderRadius: '5px',
		overflow: 'auto',
	}
}));

export default useStyles;
