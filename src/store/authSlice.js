import { createSlice } from "@reduxjs/toolkit";

const initState = { isLoggedIn: false, name: "LO" };

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    logInOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { logInOut } = authSlice.actions;

export default authSlice.reducer;