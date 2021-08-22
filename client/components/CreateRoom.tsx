import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import history from '../history';
import { connect } from 'react-redux';
import { createRooms } from '../store/rooms';

const CreateRoom = (props: { createARoom: (room: any) => void }) => {
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('roomName: ', roomName);
    history.push('/');
    props.createARoom(roomName);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <TextField id='outlined-basic' label='RoomName' variant='outlined' value={roomName} onChange={e => setRoomName(e.target.value)} />
      </form>
    </div>
  )
}

const mapDispatch = (dispatch: any) => {
  return {
    createARoom: (room: any) => { dispatch(createRooms(room)) },
  }
}

export default connect(null, mapDispatch)(CreateRoom);