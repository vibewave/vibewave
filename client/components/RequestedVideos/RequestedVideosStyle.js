import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  requestBoardHeader: {
    textAlign: 'center',
  },
  requestedVideosContainer: {
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0.1em',
  },
	requestedVideoItemsContainer: {
    border: '0.5px solid white',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '30%',
		height: '5.5em',
		backgroundColor: '#151A1C',
		color: 'white',
    cursor: 'pointer',
    overflow: 'hidden',
    margin: '0.58em',
    padding: '0.5em',
	},
  requestedVideoDescription: {
    padding: '0.3em',
    height: '95%',
    'align-self': 'flex-start',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    fontSize: '0.8em',
  },
  videoThumbnail: {
    width: '4em',
    height: '4em',
  }
}));

export default useStyles;
