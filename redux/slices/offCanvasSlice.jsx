import { createSlice } from "@reduxjs/toolkit";

const offCanvasSlice = createSlice({
  name: "offCanvas",
  initialState: {
    open: false,
    data: {
      title: "",
      event_date: "",
      id: "",
      description: "",
      category_id: "",
      imagesUrl: [],
      timeline_id: "",
    },
  },
  reducers: {
    updateData(state, action) {
      state.data = action.payload.data;
    },
    showOffCanvas(state, action) {
      state.open = action.payload.open;
    },
  },
});

export const offCanvasActions = offCanvasSlice.actions;
export default offCanvasSlice;
