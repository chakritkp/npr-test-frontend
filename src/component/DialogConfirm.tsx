import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";

type DialogConfirmProps = {
  open: boolean;
  onClick: () => void;
  onClose: () => void;
  title?: string;
  message: string;
};

const DialogConfirm: React.FC<DialogConfirmProps> = ({
  open,
  onClick,
  onClose,
  title,
  message,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={4}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h3" color={"error"}>
            {title}
          </Typography>
        </DialogTitle>
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h6">{message}</Typography>
        </DialogContentText>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={4}
      >
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            Cancel
          </Button>
          <Button onClick={onClick} variant="contained" color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default DialogConfirm;
