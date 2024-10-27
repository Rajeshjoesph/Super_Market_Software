import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/system";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "20px",
    padding: theme.spacing(2),
    textAlign: "center",
    maxWidth: "300px",
  },
}));

const CustomAlert = ({ isOpen, onClose, title, message }) => {
  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <DialogTitle style={{ fontWeight: 600, fontSize: "18px" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: "#555", fontSize: "14px" }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          style={{
            width: "100%",
            backgroundColor: "#007AFF",
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          OK
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default CustomAlert;
