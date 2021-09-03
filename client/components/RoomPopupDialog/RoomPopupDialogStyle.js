import { Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    width: '30em',
    height: '5em',
    overflowY: 'hidden',
    backgroundColor: theme.palette.primary.main,
  },
	dialogActions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em',
    backgroundColor: theme.palette.secondary.light,
	},
	dialogButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.secondary.main,
    }
	},
}));

export default useStyles;
