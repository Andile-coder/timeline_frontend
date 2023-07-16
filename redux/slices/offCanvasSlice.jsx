import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  data: {
    title: "",
    event_date: "",
    id: "",
    description: "",
    category_id: "",
    imagesUrl: [],
    timeline_id: "",
    y_axis: 10,
  },
};

const offCanvasSlice = createSlice({
  name: "offCanvas",
  initialState: initialState,
  reducers: {
    updateData(state, action) {
      state.data = action.payload.data;
    },
    showOffCanvas(state, action) {
      state.open = action.payload.open;
    },
    updateDateEventDate(state, action) {
      state.data.event_date = action.payload;
    },
    resetState(state = initialState, action) {
      return initialState;
    },
  },
});

export const offCanvasActions = offCanvasSlice.actions;
export default offCanvasSlice;
