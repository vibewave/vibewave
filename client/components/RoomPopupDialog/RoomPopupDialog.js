import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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
