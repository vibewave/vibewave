import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	allCards: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'space-around',
		justifyContent: 'center',
		padding: '25px',
		alignContent: 'space-around',
		backgroundColor: '#151A1C',
	},
	title: {
		textAlign: 'center',
		width: '100%',
	},
	titleContainer: {
		display: 'flex',
		alignItems: 'center',
		height: '6em',
		width: '100%',
	},
	descriptionContainer: {
		width: '100%',
		height: '6em',
		paddingTop: '1em',
		paddingRight: '1em',
		paddingLeft: '2em',
		paddingBottom: '1em',
	},
	description: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'left',
		width: '90%',
		height: '100%',
	},
	singleCard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '250px',
		margin: '1em',
		backgroundColor: '#12425B',
		transition: 'background-color 0.5s',
		'&:hover': {
			backgroundColor: '#4682B4',
		},
		cursor: 'pointer',
	},
	thumbnail: {
		height: '160px',
		width: '250px',
	},
}));

export default useStyles;
