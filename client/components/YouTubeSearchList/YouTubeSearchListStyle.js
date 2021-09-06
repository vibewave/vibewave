import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	searchResultItemsContainer: {
    border: '1px solid white',
    display: 'flex',
    alignItems: 'center',
		height: '5em',
		backgroundColor: '#151A1C',
		color: 'white',
    cursor: 'pointer',
    overflow: 'hidden',
    '&:first-child': {
      borderRadius: '5px 5px 0 0'
    },
    '&:last-child': {
      borderRadius: '0 0 5px 5px'
    }
	},
  thumbnailImgContainer: {
    height: '4.5em',
    marginLeft: '0.2em'
  },
  thumbnailImg: {
    width: '100%',
    height: '100%'
  },
  videoDescription: {
    marginLeft: '0.5em',
    fontSize: '0.9em'
  },
}));

export default useStyles;
