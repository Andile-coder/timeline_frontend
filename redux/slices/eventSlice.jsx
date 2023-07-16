import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  length: 0,
  timeline_id: "",
  timeline_events: [],
};
const eventsSlice = createSlice({
  name: "events",
  initialState: initialState,
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
    addTimelineEvents(state, action) {
      state.timeline_events = action.payload;
    },
    resetState(state = initialState, action) {
      return initialState;
    },
  },
});

export const eventActions = eventsSlice.actions;
export default eventsSlice;
