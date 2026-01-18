import api from "../utils/axios";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  UPDATE_USER_REQUEST,
  USER_DETAILS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
} from "../constants/userConstanat";

/* =====================
   LOGIN
===================== */
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await api.post("/api/v1/login", {
      email,
      password,
    });

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =====================
   REGISTER (SEND OTP)
===================== */
export function registerUser(signupData) {
  return async function (dispatch) {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });

      const { data } = await api.post(
        "/api/v1/register",
        signupData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
}


/* =====================
   VERIFY OTP
===================== */
export function verifyOTP(otpData) {
  return async function (dispatch) {
    try {
      dispatch({ type: OTP_VERIFY_REQUEST });

      const { data } = await api.post(
        "/api/v1/verify-otp",
        otpData
      );

      dispatch({
        type: OTP_VERIFY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: OTP_VERIFY_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
}


/* =====================
   LOAD USER PROFILE
===================== */
export const load_UserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: JSON.parse(storedUser),
      });
      return;
    }

    const { data } = await api.get("/api/v1/profile");

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });

    sessionStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =====================
   LOGOUT
===================== */
export const logout = () => async (dispatch) => {
  try {
    await api.get("/api/v1/logout");
    sessionStorage.removeItem("user");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    sessionStorage.removeItem("user");
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =====================
   UPDATE PROFILE
===================== */
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const { data } = await api.put(
      "/api/v1/profile/update",
      userData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (data.user) {
      sessionStorage.setItem("user", JSON.stringify(data.user));
    }

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =====================
   UPDATE PASSWORD
===================== */
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const { data } = await api.put(
      "/api/v1/password/update",
      passwords
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =====================
   FORGOT PASSWORD
===================== */
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const { data } = await api.post(
      "/api/v1/password/forgot",
      email
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =====================
   RESET PASSWORD
===================== */
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const { data } = await api.put(
      `/api/v1/password/reset/${token}`,
      passwords
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =====================
   ADMIN: USERS
===================== */
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await api.get("/api/v1/admin/users");

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await api.get(`/api/v1/admin/user/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const { data } = await api.put(
      `/api/v1/admin/user/${id}`,
      userData
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await api.delete(
      `/api/v1/admin/user/${id}`
    );

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

/* =====================
   CLEAR ERRORS
===================== */
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
