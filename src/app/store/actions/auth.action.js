import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  CLEAR_ORDER_BUFFER,
  SEND_EMAIL,
  MAIL_LOADING,
  ACCOUNT_VERIFICATION,
  ACCOUNT_VERIFICATION_LOADING,
  SIGNUP_SUCCESS
} from "./types";
import axios from "axios";
let endPoint = process.env.REACT_APP_AUTH_API_URL;

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token, user, verified) => {
  return {
    type: AUTH_SUCCESS,
    token,
    user,
    verified,
  };
};

export const authFail = (error, verified, user) => {
  return {
    type: AUTH_FAIL,
    error: error,
    verified,
    user,
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const accountVerified = (verified) => {
  return {
    type: ACCOUNT_VERIFICATION,
    verified,
  };
};

export const verificationLoading = () => {
  return {
    type: ACCOUNT_VERIFICATION_LOADING,
  };
};

export const accountVerification = (token) => {
  return (dispatch) => {
    dispatch(verificationLoading());
    axios
      .get(`${endPoint}/verify/${token}`)
      .then(({ data: { error } }) => {
        if (!error) dispatch(accountVerified(true));
        else dispatch(accountVerified(false));
      })
      .catch((error) => {
        dispatch(accountVerified(false));
      });
  };
};

export const sendEmail = (status) => {
  return {
    type: SEND_EMAIL,
    status,
  };
};

export const mailLoading = () => {
  return {
    type: MAIL_LOADING,
  };
};

export const sendverificationEmail = (userId) => {
  return (dispatch) => {
    dispatch(mailLoading());
    axios
      .post(`${endPoint}/verification/resend`, {
        user: { _id: userId },
      })
      .then(({ data: { error } }) => {
        if (!error) dispatch(sendEmail(true));
        else dispatch(sendEmail(false));
      })
      .catch((error) => {
        dispatch(sendEmail(false));
      });
  };
};

export const checkAuthTimeout = (expireTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expireTime * 1000);
  };
};

export const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
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
      .then(({ data: { error, token, user, expireIn, verified } }) => {
        if (error) dispatch(authFail(error, verified, user));
        else if (!error && action === 'SIGNUp') dispatch(signupSuccess());
        else {
          const expirationDate = new Date(
            new Date().getTime() + expireIn * 1000
          );
          localStorage.setItem("epxlr-auth", token);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(token, user, verified));
          dispatch(checkAuthTimeout(expireIn));
        }
      })
      .catch((error) => {
        dispatch(authFail(error.message, false));
      });
  };
};
