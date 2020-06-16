import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  CLEAR_ORDER_BUFFER,
} from "./types";
import axios from "axios";
let endPoint = process.env.REACT_APP_AUTH_API_URL;

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, user) => {
  return {
    type: AUTH_SUCCESS,
    token,
    user,
  };
};

export const authFail = (error) => {
  console.log("Auth Fail");
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  console.log("LOGOUT");
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expireTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expireTime * 1000);
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("epxlr-auth");
    if (!token) dispatch(authLogout());
    else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const user = localStorage.getItem("user");
        dispatch(authSuccess(token, user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else dispatch(authLogout());
    }
  };
};
export const auth = (data, action) => {
  let url = null;
  if (action === "SIGNIN") {
    url = `${endPoint}/signin`;
    data = { email: data.email, password: data.password };
  } else if (action === "SIGNUP") {
    url = `${endPoint}`;
    data = {
      userName: data.userName,
      email: data.email,
      password: data.password,
    };
  }
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(url, data)
      .then(({ data: { error, token, user, expireIn } }) => {
        if (error) dispatch(authFail(error));
        else {
          const expirationDate = new Date(
            new Date().getTime() + expireIn * 1000
          );
          localStorage.setItem("epxlr-auth", token);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("user", user);
          dispatch(authSuccess(token, user));
          dispatch(checkAuthTimeout(expireIn));
        }
      })
      .catch((error) => {
        dispatch(authFail(error.message));
      });
  };
};
