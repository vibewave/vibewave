import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	descriptionInput: {
		width: '100%',
		maxWidth: '35em',
	},
	titleInput: {
		width: '100%',
		maxWidth: '35em',
	},
	submit: {
		width: '100%',
		maxWidth: '35em',
		display: 'flex',
		alignContent: 'center',
	},
	createRoom: {
		display: 'flex',
		justifyContent: 'center',
	},
	name: {
		textAlign: 'center',
	},
	createRoomForm: {
		width: '35em',
		margin: '0 1.5em',
	}
}));

export default useStyles;
