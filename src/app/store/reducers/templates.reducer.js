import {
  SET_RECENT_TEMPLATES,
  TEMPLATES_FAILED,
  TEMPLATES_LOADING,
  CHANGE_TEMPLATE_BACKGROUND,
  SERVER_ERROR,
} from "../actions/types";

const initialState = {
  error: null,
  loading: false,
  recentTemplates: [],
  currentBackground: "#fff",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_RECENT_TEMPLATES:
      return {
        ...state,
        recentTemplates: action.payload.templates,
        loading: false,
      };
    case TEMPLATES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_TEMPLATE_BACKGROUND:
      return {
        ...state,
        currentBackground: action.payload.color,
      };
    case TEMPLATES_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    case SERVER_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    default:
      return state;
  }
}
