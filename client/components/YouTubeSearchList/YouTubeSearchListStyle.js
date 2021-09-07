import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	searchResultItemsContainer: {
    border: `1px solid ${theme.palette.secondary.light}`,
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
    margin: '0.5em'
  },
  thumbnailImg: {
    width: '4em',
    height: '4em'
  },
  videoDescription: {
		padding: '0.4em',
		height: '95%',
		'align-self': 'flex-start',
		overflowY: 'auto',
		overflowX: 'hidden',
		scrollbarWidth: 'thin',
		fontSize: '0.8em',
  },
}));

export default useStyles;
