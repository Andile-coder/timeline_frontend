import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedin: false, isAdmin: false, user: null },
  reducers: {
    currentUser(state, action) {
      return state.user;
    },
    login(state, action) {
      state.isLoggedin = true;
      state.user = action.payload;
    },
    logout(state, action) {
      state.isLoggedin = false;
      state.user = null;
    },
    register() {},
  },
});

export const authActions = authSlice.actions;
export default authSlice;
