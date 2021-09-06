import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	roomHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'space-evenly',
    justifyContent: 'space-evenly',
    height: '100%',
    padding: '1em',
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
    alignSelf: 'center',
  }
}));

export default useStyles;
