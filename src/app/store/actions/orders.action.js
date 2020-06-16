import {
  CREATE_ORDER,
  ORDERS_FAILED,
  ORDERS_LOADING,
  ORDER_SUMMARY,
  ORDER_SUBMITTED,
  SWITCH_TEMPLATE_ID,
  INCREMENT_IMAGES,
  DECREMENT_IMAGES,
  SERVER_ERROR,
  ADVANCED_TEMPLATE_CHARGES,
  INCREMENT_ORDER_FORM_STEP,
  DECREMENT_ORDER_FORM_STEP,
} from "./types";
import swal from "sweetalert";
import axios from "axios";
const ordersUrl = process.env.REACT_APP_ORDERS_API_URL;
const mediaUrl = process.env.REACT_APP_MEDIA_API_URL;

export const createOrder = (data, images) => async (dispatch) => {
  await dispatch(setOrderLoading());
  await axios
    .post(ordersUrl, data, {
      headers: {
        Authorization: localStorage.getItem("epxlr-auth"),
        "Content-Type": "application/json",
      },
    })
    .then(({ data, status }) => {
      if (status === 200) {
        dispatch({
          type: CREATE_ORDER,
          payload: { order: data.order, images },
        });
      } else {
        dispatch({
          type: ORDERS_FAILED,
          payload: { error: "Server Error" },
        });
      }
    })
    .catch(async (err) => await dispatch(setServerError(err.message)));
};

export const submitOrder = (data, images) => async (dispatch) => {
  await dispatch(setOrderLoading());
  await axios
    .post("http://localhost:7000/api/template", data, {
      headers: {
        Authorization: localStorage.getItem("epxlr-auth"),
        "Content-Type": "application/json",
      },
    })
    .then(({ data, status }) => {
      if (status === 200) {
        swal({
          title: "Success",
          text: "Your Order submitted. Thank You",
          icon: "success",
          button: "OK",
        });
      } else {
        swal({
          title: "Error",
          text: "Order submitted failed",
          icon: "error",
          button: "OK",
        });
      }
    })
    .catch((err) => {
      swal({
        title: "Error",
        text: "Order submitted failed",
        icon: "error",
        button: "OK",
      });
    });
};

export const generateOrderSummary = (data) => async (dispatch) => {
  dispatch({
    type: ORDER_SUMMARY,
    payload: data,
  });
};

export const incrementImages = (count) => async (dispatch) => {
  dispatch({
    type: INCREMENT_IMAGES,
    payload: count,
  });
};

export const decrementImages = () => async (dispatch) => {
  dispatch({
    type: DECREMENT_IMAGES,
  });
};

export const incrementOrderFormStep = () => async (dispatch) => {
  dispatch({
    type: INCREMENT_ORDER_FORM_STEP,
  });
};

export const decrementOrderFormStep = () => async (dispatch) => {
  dispatch({
    type: DECREMENT_ORDER_FORM_STEP,
  });
};

export const changeTemplateId = (templateId) => async (dispatch) => {
  dispatch({
    type: SWITCH_TEMPLATE_ID,
    payload: templateId,
  });
};

export const advancedTemplateCharges = (charges) => async (dispatch) => {
  dispatch({
    type: ADVANCED_TEMPLATE_CHARGES,
    payload: charges,
  });
};

export const setOrderLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};

export const setServerError = (error) => {
  return {
    type: SERVER_ERROR,
    error,
  };
};
