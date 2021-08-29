import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	searchResultItemsContainer: {
    border: '1px solid white',
    display: 'block',
		height: '4.5em',
		backgroundColor: '#151A1C',
		color: 'white',
	},
  searchResultItems: {
    display: 'flex',
    alignItems: 'center',

  },
  trackDescription: {
    marginLeft: '0.5em',
  },
}));

export default useStyles;
