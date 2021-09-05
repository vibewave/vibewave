import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	roomHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  roomImgContainer: {
    height: '60px',
  },
  roomImg: {
    height: '90%'
  },
  roomDescriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  liveUsersContainer: {
    alignSelf: 'flex-start',
    margin: '3em'
  }
}));

export default useStyles;
