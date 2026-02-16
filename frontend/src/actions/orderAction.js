import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERRORS,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_SUCCESS,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
} from "../constants/orderConstant";

import axios from "axios";

/* ======================================================
                CREATE ORDER (COD / CARD / UPI)
====================================================== */

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const { data } = await axios.post(
      "https://style-in-backend.onrender.com/api/v1/order/new",
      order,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    // store only order object (important for success page)
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.order,
    });

  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


/* ======================================================
                USER ORDERS
====================================================== */

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get(
      "https://style-in-backend.onrender.com/api/v1/orders/myOrders",
      { withCredentials: true }
    );

    dispatch({ type: MY_ORDER_SUCCESS, payload: data.userOrders });

  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


/* ======================================================
                ORDER DETAILS
====================================================== */

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(
      `https://style-in-backend.onrender.com/api/v1/order/${id}`,
      { withCredentials: true }
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


/* ======================================================
                ADMIN - GET ALL ORDERS
====================================================== */

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(
      "https://style-in-backend.onrender.com/api/v1/admin/orders",
      { withCredentials: true }
    );

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });

  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


/* ======================================================
                ADMIN - DELETE ORDER
====================================================== */

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(
      `https://style-in-backend.onrender.com/api/v1/admin/order/${id}`,
      { withCredentials: true }
    );

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });

  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


/* ======================================================
                ADMIN - UPDATE ORDER STATUS
====================================================== */

export const updateOrder = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const { data } = await axios.put(
      `https://style-in-backend.onrender.com/api/v1/admin/order/${id}`,
      productData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });

  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


/* ======================================================
                CLEAR ERRORS
====================================================== */

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
