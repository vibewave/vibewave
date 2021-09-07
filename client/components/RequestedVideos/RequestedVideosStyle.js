import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  requestBoardHeader: {
    textAlign: 'center',
    color: theme.palette.primary.mix
  },
  requestedVideosContainer: {
    height: '92%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
	requestedVideoItemsContainer: {
    border: `0.5px solid ${theme.palette.secondary.light}`,
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    width: '30%',
    minWidth: '15em',
		height: '5.5em',
		backgroundColor: '#151A1C',
		color: 'white',
    cursor: 'pointer',
    overflow: 'hidden',
    margin: '0.58em',
    padding: '0.5em',
	},
  requestedVideoItemsContainerUser: {
    border: `0.5px solid ${theme.palette.secondary.light}`,
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '30%',
    minWidth: '14em',
		height: '5.5em',
		backgroundColor: '#151A1C',
		color: 'white',
    overflow: 'hidden',
    margin: '0.58em',
    padding: '0.5em',
    cursor: 'default',
  },
  requestedVideoDescription: {
    padding: '0.3em 0.3em 0.3em 0.8em',
    height: '95%',
    'align-self': 'flex-start',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    fontSize: '0.8em',
  },
  videoThumbnail: {
    width: '5em',
  }
}));

export default useStyles;
