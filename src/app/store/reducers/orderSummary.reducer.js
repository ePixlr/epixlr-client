import {
  ORDER_SUMMARY,
  SWITCH_TEMPLATE_ID,
  INCREMENT_IMAGES,
} from "../actions/types";

const initialState = {
  loading: false,
  summary: {},
  noOfImages: 0,
  templateId: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORDER_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };
    case SWITCH_TEMPLATE_ID:
      return {
        ...state,
        templateId: action.payload,
      };
    case INCREMENT_IMAGES:
      return {
        ...state,
        noOfImages: action.payload,
      };
    default:
      return state;
  }
}
