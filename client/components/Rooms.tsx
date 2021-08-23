import React from 'react';
import { connect } from 'react-redux';

const Rooms = (props: {rooms: any}) => {

  return (
    <div>
      {props.rooms.map((room: any) => (
        <div key={room}>
          {room}
        </div>
      ))}
    </div>
  )
}

const mapState = (state: any) => {
  return {
    rooms: state.rooms,
  }
}

export default connect(mapState)(Rooms);