import { ORDER_SUMMARY, SWITCH_TEMPLATE_ID, INCREMENT_IMAGES } from "./types";

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

export const changeTemplateId = (templateId) => async (dispatch) => {
  dispatch({
    type: SWITCH_TEMPLATE_ID,
    payload: templateId,
  });
};
