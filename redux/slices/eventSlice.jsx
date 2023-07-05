import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    length: 0,
    timeline_id: "",
  },
  reducers: {
    addEventData(state, action) {
      state.events.push(action.payload.event);
      state.length = state.events.length;
    },
    addTimelineId(state, action) {
      if (state.events.length !== 0) {
        state.events = state.events.map((event) => ({
          ...event,
          timeline_id: action.payload.timeline_id,
        }));
      }
    },
  },
});

export const eventActions = eventsSlice.actions;
export default eventsSlice;
