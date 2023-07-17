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
    y_axis: 20,
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
    updateEventCoordinates(state, action) {
      state.data.event_date = action.payload.x;
      state.data.y_axis = action.payload.y;
    },
    resetState(state = initialState, action) {
      return initialState;
    },
  },
});

export const offCanvasActions = offCanvasSlice.actions;
export default offCanvasSlice;
