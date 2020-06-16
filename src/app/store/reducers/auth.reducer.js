import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
} from "../actions/types";

const initialState = {
  token: null,
  user: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    user: action.user,
    error: null,
    loading: false,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
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
    default:
      return state;
  }
};

export default reducer;
