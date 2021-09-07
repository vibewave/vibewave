import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	roomHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: '0.25em 0.25em 0 0',
    height: '100%',
    overflow: 'hidden',
  },
  roomImgContainer: {
    display: 'flex',
    width: '15%',
    height: '60px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomImg: {
    width: '80%',
    overflow: 'hidden',
  },
  roomDescriptionContainer: {
    padding: '0 2em',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  liveUsersContainer: {
    height: '100%',
    width: '35%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 1em',
  },
  liveUsersText: {
    padding: '0.5em',
    width: '88%',
  }
}));

export default useStyles;
