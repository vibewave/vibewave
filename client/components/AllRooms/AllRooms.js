import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { fetchRooms, handleEnterRoom, fetchThumbnails } from '../../store';
import useStyles from './AllRoomsStyle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const AllRooms = () => {
	const classes = useStyles();
	const history = useHistory();
	const user = useSelector(state => state.auth);
	const rooms = useSelector(state => state.allRooms);
	const thumbnails = useSelector(state => state.thumbnails);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRooms());
		dispatch(fetchThumbnails());
	}, []);

	return (
		<div className={classes.allCards}>
			{rooms.map((room) => (
				<div key={room.id} onClick={() => dispatch(handleEnterRoom(room.id, user.id, history))}>
					<Card className={classes.singleCard}>
						<CardContent className={classes.titleContainer}>
							<Typography
								variant="h6"
								color="textSecondary"
								component="h2"
								className={classes.title}
							>
								{room.title}
							</Typography>
						</CardContent>
						<CardActionArea>
							<img src={thumbnails[room.id] ? thumbnails[room.id] : 'darkmusiciconwide.png'} className={classes.thumbnail}/>
						</CardActionArea>
						<div className={classes.descriptionContainer}>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								className={classes.description}
							>
								{room.description}
							</Typography>
						</div>
					</Card>
				</div>
			))}
		</div>
	);
};

export default AllRooms;
