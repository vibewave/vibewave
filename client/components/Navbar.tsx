import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid } from '@material-ui/core';

const navBarContainer = {
  backgroundColor: '#012F41',
  marginTop: '-0.5em',
  marginLeft: '-0.5em',
  marginRight: '-0.5em',
}

const logoContainer = {
  color: 'white',
  padding: '0.2em',
}

const createRoomButton = {
  border: 'solid 0.2em white',
}

const Navbar = () => {

  return (
    <div id='navbar-container' style={navBarContainer}>
      <Grid container>
          <Typography variant='h4' style={logoContainer}>Vibewave
            <Link to='/createroom'>
                <Button variant='contained' style={createRoomButton}>Create Room</Button>
            </Link>
          </Typography>
      </Grid>
    </div>
  )
}

export default Navbar;