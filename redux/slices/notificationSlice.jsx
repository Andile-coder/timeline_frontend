import { createSlice } from "@reduxjs/toolkit";

const notification = createSlice({
  name: "notification",
  initialState: { notification: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type,
        open: action.payload.open,
      };
    },
  },
});

export const notificationActions = notification.actions;
export default notification;
