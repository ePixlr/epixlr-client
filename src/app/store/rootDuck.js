import { all } from "redux-saga/effects";
import { combineReducers } from "redux";
import orderReducer from "./reducers/orders.reducer";
import authReducer from "./reducers/auth.reducer";
import templateReducer from "./reducers/templates.reducer";

import * as auth from "./ducks/auth.duck";
import { metronic } from "../../_metronic";

export const rootReducer = combineReducers({
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
  orders: orderReducer,
  auth: authReducer,
  templates: templateReducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
