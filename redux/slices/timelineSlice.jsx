import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    timelines: [],
    modal: false,
    timeline: {},
  },
  reducers: {
    getTimeline(state, action) {
      return state.timeline;
    },
    addTimeline(state, action) {
      state.timeline = action.payload;
    },
    createTimeline(state, action) {
      state.timelines.push(action.payload);
    },
    showModal(state, action) {
      state.modal = action.payload;
    },
    clearState(state, action) {
      state.timelines = [];
      state.modal = false;
    },
  },
});

export const timelineActions = timelineSlice.actions;
export default timelineSlice;
