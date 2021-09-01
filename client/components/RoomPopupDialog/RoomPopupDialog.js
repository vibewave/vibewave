import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './RoomPopupDialogStyle';;

const RoomPopupDialog = (props) => {
  const {
    isDialogOpen,
    closeRoomPopupDialog,
    room,
    user
  } = props;

  const classes = useStyles();

  const currentTimeOfDay = new Date().getHours();
  const showWelcomeMessage = () => {
    let message = '';
    if (currentTimeOfDay > 22 && currentTimeOfDay > 0 && currentTimeOfDay < 5) {
      message = 'Happy Late Night';
    }
    else if (currentTimeOfDay < 12) {
      message = 'Good Morning';
    }
    else if (currentTimeOfDay < 18) {
      message = 'Good Afternoon';
    }
    else {
      message = 'Good Evening';
    }
    return message;
  }

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        keepMounted
        onClose={closeRoomPopupDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title" className={classes.dialogTitle}>
          <p>{`${showWelcomeMessage()} ${user.username}.`}</p>
        </DialogTitle>
        <DialogTitle className={classes.dialogTitle}>
          {`You entered ${room.title}!`}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`- You can enjoy listening to the tracks hosted by HOST-NAME with all other users in this room.`}</DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {`- You can also make  requests to the host to play your favorite tracks. Be aware if your track doesn't seem to fit the vibe of ${room.title}, the host may not play your requested song!`}</DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {`- Due to modern browsers' autoplay policy, your Spotify player may abruptly stop while listening. In such case, simple click anywhere in the room and refresh the page!`}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {`- You have control over the play/pause button, so whenever you would like some peace without leaving the room, just pause the player. When you resume, you will resume listening to the currently song in this room.`}
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            {`- To start partying, click the button below and off you go~`}
          </DialogContentText>
        </DialogContent> */}
        <DialogActions className={classes.dialogActions}>
          <Button onClick={closeRoomPopupDialog} color='primary' className={classes.dialogButton}>
            Join the Party
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RoomPopupDialog;
