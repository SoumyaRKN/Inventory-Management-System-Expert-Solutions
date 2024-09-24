import React, { Fragment, forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomConfirmDialog = ({ confirmDialog, setConfirmDialog }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { isOpen, title, subtitle, description, onConfirm } = confirmDialog;

  const handleClose = () => setConfirmDialog({ ...confirmDialog, isOpen: false });

  return (
    <Fragment>
      <Dialog
        open={isOpen}
        keepMounted
        onClose={handleClose}
        fullScreen={fullScreen}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <Typography fontSize={21} fontWeight={600}>{title || ""}</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography fontSize={16} fontWeight={600} mb={0.5}>{subtitle || ""}</Typography>
          <Typography variant="subtitle2">{description || ""}</Typography>
        </DialogContent>
        <DialogActions sx={{ my: 1, mx: 1 }}>
          <Button variant="contained" onClick={handleClose}>No</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onConfirm();
              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CustomConfirmDialog;