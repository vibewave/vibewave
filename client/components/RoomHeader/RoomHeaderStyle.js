import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	roomHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.primary.light}`,
    height: '100%'
  },
  roomImgContainer: {
    height: '60px',
  },
  roomImg: {
    height: '100%',
    overflow: 'hidden'
  },
  roomDescriptionContainer: {
    padding: '0 2em',
    display: 'flex',
    flexDirection: 'column',
    width: '60%'
  },
  liveUsersContainer: {
    margin: '3em'
  }
}));

export default useStyles;
