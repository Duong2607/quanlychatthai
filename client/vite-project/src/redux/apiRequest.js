import axios from "../axios";
import { loginStart, loginSuccess, loginFailed } from "./authSlice";
import { registerFailed, registerStart, registerSuccess } from "./authSlice";
import { logOutFailed, logOutStart, logOutSuccess } from "./authSlice";


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const res = await axios.post("/v1/auth/login", user);
      dispatch(loginSuccess(res));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };
  export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
      await axios.post("/v1/auth/register", user);
      dispatch(registerSuccess());
      navigate("/login");
    } catch (err) {
      dispatch(registerFailed());
    }
  };

  export const logOut = async (dispatch, id, navigate, accessToken) => {
    dispatch(logOutStart());
    try {
      await axios.post("/v1/auth/logout", id, {
        headers: { token: `Bearer ${accessToken}` },
      });
      dispatch(logOutSuccess());
      navigate("/login");
    } catch (err) {
      dispatch(logOutFailed());
    }
  };