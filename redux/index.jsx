import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import notificationSlice from "./slices/notificationSlice";
import offCanvasSlice from "./slices/offCanvasSlice";
import eventsSlice from "./slices/eventSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    offCanvas: offCanvasSlice.reducer,
    events: eventsSlice.reducer,
  },
});

export default store;
