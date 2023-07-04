import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import notificationSlice from "./slices/notificationSlice";
import offCanvasSlice from "./slices/offCanvasSlice";
import eventsSlice from "./slices/eventSlice";
import loaderSlice from "./slices/loader";
import timelineSlice from "./slices/timelineSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    offCanvas: offCanvasSlice.reducer,
    events: eventsSlice.reducer,
    loader: loaderSlice.reducer,
    timeline: timelineSlice.reducer,
  },
});

export default store;
