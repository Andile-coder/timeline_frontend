import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import notification from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notification.reducer,
  },
});

export default store;
