"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.loginFailure = exports.loginSuccess = exports.loginStart = void 0;

var _toolkit = require("@reduxjs/toolkit");

var userSlice = (0, _toolkit.createSlice)({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false
  },
  reducers: {
    loginStart: function loginStart(state) {
      state.isFetching = true;
    },
    loginSuccess: function loginSuccess(state, action) {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: function loginFailure(state) {
      state.isFetching = false;
      state.error = true;
    }
  }
});
var _userSlice$actions = userSlice.actions,
    loginStart = _userSlice$actions.loginStart,
    loginSuccess = _userSlice$actions.loginSuccess,
    loginFailure = _userSlice$actions.loginFailure;
exports.loginFailure = loginFailure;
exports.loginSuccess = loginSuccess;
exports.loginStart = loginStart;
var _default = userSlice.reducer;
exports["default"] = _default;