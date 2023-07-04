import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    timelines: [],
    modal: false,
  },
  reducers: {
    getTimelines(state, action) {
      return state.timelines;
    },
    createTimeline(state, action) {
      state.timelines.push(action.payload);
    },
    showModal(state, action) {
      state.modal = action.payload;
    },
  },
});

export const timelineActions = timelineSlice.actions;
export default timelineSlice;
