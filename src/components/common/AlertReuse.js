import React from "react";
import { Alert, Snackbar } from "@mui/material";

const AlertReuse = ({ open, handleClose, severity, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert sx={{
    fontSize: "1.2rem",  // Increase text size
    padding: "20px",     // Increase padding
    width: "400px"       // Increase width
  }} onClose={handleClose} severity={severity} >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertReuse;
