import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { fetchRooms } from '../../store';
import useStyles from './AllRoomsStyle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const AllRooms = () => {
	const classes = useStyles();
	const history = useHistory();
	const auth = useSelector(state => state.auth);
	const rooms = useSelector(state => state.allRooms);

	console.log('auth: ', auth);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRooms());
	}, []);


	const handleEnterRoom = async (roomId) => {
		await axios.put(`/api/users/${auth.id}`, { roomId });
		history.push(`/rooms/${roomId}`);
	}

	return (
		<div className={classes.allCards}>
			{rooms.map(room => (
				<div key={room.id} onClick={() => handleEnterRoom(room.id)}>
					<Card className={classes.singleCard}>
						{/* <Link to={`/rooms/${room.id}`}> */}
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									color="textSecondary"
									component="h2"
									className={classes.title}
								>
									<div>{room.title}</div>
								</Typography>
							</CardContent>
							<CardActionArea>
								<img
									src="/darkMusicIcon.jpg"
									alt="defaultRoomIcon"
									className={classes.roomIcon}
								/>
							</CardActionArea>

							{/* <CardActions>
							<Button size="small" color="primary">
								Share
							</Button>
							<Button size="small" color="primary">
								Like Room
							</Button>
						</CardActions> */}
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								className={classes.description}
							>
								{room.description}
							</Typography>
						{/* </Link> */}
					</Card>
				</div>
			))}
		</div>
	);
};

export default AllRooms;
