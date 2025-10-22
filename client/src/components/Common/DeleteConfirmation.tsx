import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
export interface DeleteConfirmationType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  message?: string;
  onDelete?: () => void;
  setDeleteDialogProps: React.Dispatch<
    React.SetStateAction<DeleteConfirmationType | {}>
  >;
}

const DeleteConfirmation = ({
  open,
  setOpen,
  title = "Confirm Deletion",
  message = "Are you sure want to delete this item? This action be undone.",
  onDelete = () => {},
  setDeleteDialogProps,
}: DeleteConfirmationType) => {
  const handleClose = () => {
    setDeleteDialogProps({});
    setOpen(false);
  };
  // const handleOpen = () => {
  //   setOpen(false);
  // };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-delete-confirmation-dialog-title"
      aria-describedby="alert-delete-confirmation-dialog-description"
    >
      <DialogTitle id="alert-delete-confirmation-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-confirmation-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 3 }}>
        <Button
          variant="contained"
          onClick={handleClose}
          color="inherit"
          autoFocus
        >
          Cencel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
            onDelete();
          }}
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
