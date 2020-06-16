import {
  ORDER_SUMMARY,
  SWITCH_TEMPLATE_ID,
  INCREMENT_IMAGES,
  CREATE_ORDER,
  ORDERS_LOADING,
  ORDERS_FAILED,
  ORDER_SUBMITTED,
  SERVER_ERROR,
  CLEAR_ORDER_BUFFER,
  ADVANCED_TEMPLATE_CHARGES,
  INCREMENT_ORDER_FORM_STEP,
  DECREMENT_ORDER_FORM_STEP,
} from "../actions/types";

const initialState = {
  error: null,
  loading: false,
  summary: {},
  noOfImages: 0,
  templateId: null,
  orderId: null,
  imagesBuffer: [],
  advancedTemplateCharges: 0,
  orderFormStep: 2,
};

export default function(state = initialState, action) {
  const dumpArray = state.imagesBuffer;
  switch (action.type) {
    case CREATE_ORDER:
      Array.from(action.payload.images).map((path) => {
        dumpArray.push(URL.createObjectURL(path));
      });
      return {
        ...state,
        orderId: action.payload.order,
        imagesBuffer: dumpArray,
        loading: false,
      };
    case CLEAR_ORDER_BUFFER:
      console.log("order reducer");
      return {
        ...state,
        imagesBuffer: [],
      };
    case ORDER_SUMMARY:
      return {
        ...state,
        summary: action.payload,
      };
    case ORDER_SUBMITTED:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SWITCH_TEMPLATE_ID:
      return {
        ...state,
        templateId: action.payload,
      };
    case INCREMENT_IMAGES:
      return {
        ...state,
        noOfImages: state.noOfImages + action.payload,
      };
    case INCREMENT_ORDER_FORM_STEP:
      return {
        ...state,
        orderFormStep: state.orderFormStep + 1,
      };
    case DECREMENT_ORDER_FORM_STEP:
      return {
        ...state,
        orderFormStep: state.orderFormStep - 1,
      };
    case ADVANCED_TEMPLATE_CHARGES:
      return {
        ...state,
        advancedTemplateCharges: action.payload,
      };
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ORDERS_FAILED:
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
