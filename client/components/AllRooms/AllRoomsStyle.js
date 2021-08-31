import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	allCards: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'space-around',
		justifyContent: 'space-around',
		padding: '50px',
		alignContent: 'space-around',
	},
	title: {
		textAlign: 'center',
	},
	description: {
		width: '185px',
		height: '70px',
		overflow: 'auto',
		margin: '1em',
	},
	singleCard: {
		width: '200px',
		height: '350px',
	},
	
}));

export default useStyles;
