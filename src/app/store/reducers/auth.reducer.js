import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  SEND_EMAIL,
  MAIL_LOADING,
  ACCOUNT_VERIFICATION,
  ACCOUNT_VERIFICATION_LOADING,
  SIGNUP_SUCCESS
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("epxlr-auth"),
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
  loading: false,
  isVerified: false,
  mailStatus: false,
  mailLoading: false,
  account_verified: false,
  verification_loading: false,
  message: ""
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
    message: false
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    user: action.user,
    isVerified: action.verified,
    error: null,
    loading: false,
    message: true
  };
};

const authFail = (state, action) => {
  localStorage.removeItem("epxlr-auth");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  return {
    ...state,
    error: action.error,
    loading: false,
    user: action.user,
    message: false,
    isVerified: action.verified === undefined ? true : action.verified,
  };
};

const sendEmail = (state, action) => {
  return {
    ...state,
    mailStatus: action.status,
    mailLoading: false,
  };
};

const mailLoading = (state, action) => {
  return {
    ...state,
    mailStatus: false,
    mailLoading: true,
  };
};

const signupSuccess = (state, action) => {
  return {
    ...state,
    message: true
  };
};

const accountVerification = (state, action) => {
  return {
    ...state,
    account_verified: action.verified,
    verification_loading: false,
  };
};

const verificationLoading = (state, action) => {
  return {
    ...state,
    verification_loading: true,
  };
};

const authLogout = (state, action) => {
  localStorage.removeItem("epxlr-auth");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  return {
    ...state,
    token: null,
    user: null,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    case SEND_EMAIL:
      return sendEmail(state, action);
    case MAIL_LOADING:
      return mailLoading(state, action);
    case ACCOUNT_VERIFICATION:
      return accountVerification(state, action);
    case ACCOUNT_VERIFICATION_LOADING:
      return verificationLoading(state, action);
      case SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
