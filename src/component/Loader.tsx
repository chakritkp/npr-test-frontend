import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import React from "react";

type LoaderProps = {
  open: boolean;
  onClose: () => void;
};

const Loader: React.FC<LoaderProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-loader-title"
      aria-describedby="modal-loader-description"
      BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
    >
      <Box sx={style}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    </Modal>
  );
};

export default Loader;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
};
