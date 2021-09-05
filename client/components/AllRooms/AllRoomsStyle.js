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
		backgroundColor: '#151A1C',
	},
	title: {
		display: 'table-cell',
		height: '60px',
		textAlign: 'center',
		verticalAlign: 'middle',
	},
	titleContainer: {
		display: 'flex',
		alignItems: 'center',
		height: '90px',
		padding: '0',
	},
	description: {
		width: '185px',
		height: '70px',
		overflow: 'auto',
		margin: '1em',
	},
	singleCard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '250px',
		// height: '325px',
		margin: '1em',
	},
	thumbnail: {
		height: '100%',
		width: '100%',
	},
}));

export default useStyles;
