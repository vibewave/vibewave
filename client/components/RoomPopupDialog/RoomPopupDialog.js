import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const RoomPopupDialog = (props) => {
  const {
    isDialogOpen,
    closeRoomPopupDialog
  } = props;

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        keepMounted
        onClose={closeRoomPopupDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRoomPopupDialog} color="primary">
            Disagree
          </Button>
          <Button onClick={closeRoomPopupDialog} color="primary">
            Got it. Let's Party!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RoomPopupDialog;
