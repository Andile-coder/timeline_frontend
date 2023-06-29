import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    length: 0,
  },
  reducers: {
    addEventData(state, action) {
      state.events.push(action.payload.event);
      state.length = state.events.length;
    },
  },
});

export const eventsSliceActions = eventsSlice.actions;
export default eventsSlice;
