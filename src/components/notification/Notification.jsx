import React from "react";
import { Alert } from "@mui/material";
import { notificationActions } from "../../../redux/slices/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
const Notification = ({ message, type }) => {
  const notification = useSelector(
    (state) => state.notification.notification.open
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(notificationActions.showNotification({ open: false }));
  };
  return (
    <div>
      {notification && (
        <Alert severity={type} onClose={handleClose}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
