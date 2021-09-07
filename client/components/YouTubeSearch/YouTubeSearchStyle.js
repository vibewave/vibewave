import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	videoSearchContainer: {
		width: '100%',
		height: '100%',
	},
	videoSearchInputContainer: {
		width: '100%',
		overflow: 'hidden',
	},
	videoSearchInput: {
		borderRadius: '0.5em',
		background: '#012F41',
		width: '80%',
	},
	searchButton: {
		padding: '0.2em',
		width: '20%',
		height: '4.2em',
		cursor: 'pointer',
	},
	songList: {
		width: '100%',
		height: '83%',
		borderRadius: '5px',
		overflow: 'auto',
	}
}));

export default useStyles;
