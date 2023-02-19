import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    errorText: null,
    error: false,
    registerData: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.errorText = action.payload;
      state.error = true;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.registerData = action.payload;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorText = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    reset: (state) => {
      state.isFetching = false;
      state.errorText = null;
      state.error = false;
      state.registerData = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  reset,
} = userSlice.actions;
export default userSlice.reducer;
