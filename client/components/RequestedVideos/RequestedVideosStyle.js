import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  requestedVideosContainer: {
    height: '100%',
    // minWidth: '180px',
    display: 'flex',
    alignItems: 'center'
  },
	requestedVideoItemsContainer: {
    border: '0.5px solid white',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '100%',
		height: '5.5em',
		backgroundColor: '#151A1C',
		color: 'white',
    cursor: 'pointer',
    overflow: 'hidden',
	},
  requestedVideoDescription: {
    marginTop: '0.5em',
    marginLeft: '0.5em',
    'align-self': 'flex-start',
  },
  videoThumbnail: {
    width: '4em',
    height: '4em',
  }
}));

export default useStyles;
