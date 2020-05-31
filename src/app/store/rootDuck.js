import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import orderReducer from "./reducers/orderSummary.reducer";

import * as auth from "./ducks/auth.duck";
import { metronic } from "../../_metronic";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
  orders: orderReducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
