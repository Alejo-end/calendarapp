import { all } from "@redux-saga/core/effects";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import calendar from "../redux/reducer";
import { calendarSagas } from "../redux/sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    calendar,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: { maxAge: 30, name: "calendar" },
});

export function* rootSagas() {
  yield all([calendarSagas()]);
}

sagaMiddleware.run(rootSagas);

export const selectRoot = (state: RootState) => state;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
