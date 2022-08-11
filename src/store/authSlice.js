import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetBooks } from "./bookSlice";
import { resetLogs } from "./reportSlice";

const initState = { isLoggedIn: false, name: "LO" };

export const resetStore = createAsyncThunk(
  "auth/logOut",

  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;

    dispatch(resetBooks());

    dispatch(resetLogs());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    logOut: (state) => {
      state.isLoggedIn = false;
    },
    logIn: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { logOut, logIn } = authSlice.actions;

export default authSlice.reducer;
