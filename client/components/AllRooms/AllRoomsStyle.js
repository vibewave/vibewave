import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	allCards: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'space-around',
		justifyContent: 'flex-start',
		padding: '25px',
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
		margin: '1em',
		backgroundColor: '#12425B',
		transition: 'background-color 0.5s',
		'&:hover': {
			backgroundColor: '#4682B4',
		},
		cursor: 'pointer',
	},
	thumbnail: {
		height: '160.6px',
		width: '250px',
	},
}));

export default useStyles;
