import React from "react";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clearNotification } from "../store/notification-slice";

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.notification);

  const handleClose = () => {
    dispatch(clearNotification());
  };

  return (
    <Snackbar
      open={Boolean(message)}
      message={message}
      autoHideDuration={6000}
      onClose={handleClose}
    />
  );
};

export default Notification;
