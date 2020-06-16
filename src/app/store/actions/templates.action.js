import {
  SET_RECENT_TEMPLATES,
  TEMPLATES_FAILED,
  TEMPLATES_LOADING,
  CHANGE_TEMPLATE_BACKGROUND,
  SERVER_ERROR,
} from "./types";
import axios from "axios";
// const templatesUrl = process.env.REACT_APP_ORDERS_API_URL;

export const getRecentTemplates = () => async (dispatch) => {
  await dispatch(setTemplateLoading());
  await axios
    .get("http://localhost:7000/api/template", {
      headers: {
        Authorization: localStorage.getItem("epxlr-auth"),
        "Content-Type": "application/json",
      },
    })
    .then(({ data, status }) => {
      if (status === 200) {
        dispatch({
          type: SET_RECENT_TEMPLATES,
          payload: { templates: data },
        });
      } else {
        dispatch({
          type: TEMPLATES_FAILED,
          payload: { error: "Server Error" },
        });
      }
    })
    .catch(async (err) => await dispatch(setServerError(err.message)));
};

export const changeTemplateBackground = (color) => async (dispatch) => {
  dispatch({
    type: CHANGE_TEMPLATE_BACKGROUND,
    payload: { color },
  });
};

export const setTemplateLoading = () => {
  return {
    type: TEMPLATES_LOADING,
  };
};

export const setServerError = (error) => {
  return {
    type: SERVER_ERROR,
    error,
  };
};
