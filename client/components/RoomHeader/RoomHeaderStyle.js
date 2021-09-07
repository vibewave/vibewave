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
    padding: '1em',
    display: 'flex',
    width: '15%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomImg: {
    overflow: 'hidden',
  },
  roomDescriptionContainer: {
    padding: '0 1em',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    height: '70%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  hostedBy: {
    color: theme.palette.primary.light
  },
  liveUsersContainer: {
    padding: '0 0.5em',
    height: '70%',
    width: '35%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  liveUsersText: {
    // width: '88%',
    fontStyle: 'italic',
  },
  numUsers: {
    color: theme.palette.primary.light
  }
}));

export default useStyles;
