import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: { loading: false },
  reducers: {
    showLoader(state, action) {
      state.loading = action.payload;
    },
  },
});

export const loaderActions = loaderSlice.actions;
export default loaderSlice;
