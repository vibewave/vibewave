import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	videoSearchContainer: {
		width: '99%',
		height: '100%',
	},
	videoSearchInput: {
		borderRadius: '0.5em',
		background: '#012F41',
		width: '100%',
	},
	searchButton: {
		position: 'fixed',
		right: '',
		padding: '0.2em',
		width: '15px',
		// '.MuiButton-label': {
		// 	width: '50%',
		// 	maxWidth: '5px'
		// }
	},
	songList: {
		width: '100%',
		height: '100%',
		borderRadius: '5px',
		overflow: 'auto',
	}
}));

export default useStyles;
