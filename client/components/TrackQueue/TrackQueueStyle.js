import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  trackQueueContainer: {
    width: '100%',
    // minWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
	trackQueueItemsContainer: {
    border: '0.5px solid white',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: '100%',
		height: '5.5em',
		backgroundColor: '#151A1C',
		color: 'white',
    overflowX: 'auto',
	},
  trackQueueDescription: {
    marginLeft: '0.5em',
  },
}));

export default useStyles;