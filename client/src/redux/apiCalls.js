import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./userRedux";
import { publicRequest } from "../requestMethods.js";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    const { response } = error;
    dispatch(loginFailure(response.data));
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", {
      username: user.userName,
      email: user.email,
      password: user.password,
    });
    console.log("Esto es res", res.data);
    dispatch(registerSuccess(res.data));
    /*  navigate('/login'); */
  } catch (error) {
    const { response } = error;
    dispatch(registerFailure(response.data));
  }
};
