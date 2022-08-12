import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods.js";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const registerUser = async (user) => {
  try {
    const res = await publicRequest.post("/auth/register", {
      username: user.userName,
      email: user.email,
      password: user.password,
    });
    return res.data
  } catch (error) {
    console.log(error);
  }
};
