// Notification.tsx
import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clearNotification } from "../store/notification-slice";

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector(
    (state: RootState) => state.notification
  );

  const handleClose = () => {
    dispatch(clearNotification());
  };

  return (
    <Snackbar
      open={Boolean(notification)}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={notification?.type}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{notification?.type.toUpperCase()}</AlertTitle>
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
