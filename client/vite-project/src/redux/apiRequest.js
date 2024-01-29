import axios from "../axios";
import { loginStart, loginSuccess, loginFailed } from "./authSlice";
import { registerFailed, registerStart, registerSuccess } from "./authSlice";
import { logOutFailed, logOutStart, logOutSuccess } from "./authSlice";
import { getUsersStart, getUsersFailed, getUsersSuccess } from "./userSlice";
import { deleteUserStart, deleteUserFailed, deleteUserSuccess } from "./userSlice";
import { getUserStart, getUserFailed, getUserSuccess } from "./userSlice";
import { updateUserStart, updateUserFailed, updateUserSuccess } from "./userSlice";
import { getBinsStart, getBinsFailed, getBinsSuccess } from "./binSlice";
import { deleteBinStart, deleteBinFailed, deleteBinSuccess } from "./binSlice";
import { addBinStart, addBinFailed, addBinSuccess } from "./binSlice";
import { updateBinStart, updateBinFailed, updateBinSuccess } from "./binSlice";

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

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("/v1/user", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id, navigate) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete(`/v1/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUserSuccess("Xoá thành công"));
    navigate("/user");
  } catch (err) {
    dispatch(deleteUserFailed("Không thành công"));
  }
};

export const getUser = async (accessToken, dispatch, id) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(`/v1/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res));
  } catch (err) {
    dispatch(getUserFailed());
  }
};

export const updateUser = async (accessToken, dispatch, id, user) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`/v1/user/${id}`, user, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateUserSuccess(res));
  } catch (err) {
    dispatch(updateUserFailed());
  }
};

export const getAllBins = async (dispatch) => {
  dispatch(getBinsStart());
  try {
    const res = await axios.get("/api/get-all-bin");
    dispatch(getBinsSuccess(res));
  } catch (err) {
    dispatch(getBinsFailed());
  }
};

export const deleteBin = async (dispatch, binId, navigate) => {
  dispatch(deleteBinStart());
  try {
    const res = await axios.delete("/api/delete-bin", {
      data: { id: binId },
    });

    dispatch(deleteBinSuccess("Xoá thành công"));
    navigate("/bin");
  } catch (err) {
    dispatch(deleteBinFailed("Không thành công"));
  }
};

export const addBin = async ( dispatch, bin, navigate) => {
  dispatch(addBinStart());
  try {
    const res = await axios.post("/api/add-new-bin", bin,);
    dispatch(addBinSuccess(res));
    navigate("/bin")
  } catch (err) {
    dispatch(addBinFailed());
  }
};

export const updateBin = async ( dispatch, bin ) => {
  dispatch(updateBinStart());
  try {
    const res = await axios.put("/api/update-bin", bin,
    // { headers: { token: `Bearer ${accessToken}`} },
    );
    dispatch(updateBinSuccess(res));
  } catch (err) {
    dispatch(updateBinFailed());
  }
};