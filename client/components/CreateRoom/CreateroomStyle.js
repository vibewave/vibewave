import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	descriptionInput: {
		width: '500px',
	},
	titleInput: {
		width: '500px',
	},
	submit: {
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
}));

export default useStyles;
