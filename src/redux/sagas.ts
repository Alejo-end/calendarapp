import { PayloadAction } from "@reduxjs/toolkit";
import { getDay, getDaysInMonth } from "date-fns";
import { takeLatest, select, put, all } from "redux-saga/effects";
import { RootState } from "../store/store";
import { CalendarState, Day, Grid } from "../typings";
import {
  calculateGrid,
  dayClicked,
  gridCalculated,
  nextMonthClicked,
  previousMonthClicked,
} from "./reducers/calendar";

function* _calculateGrid(
  event: PayloadAction<unknown>
): Generator<unknown, void, CalendarState> {
  if (event.type === dayClicked.type && !(event.payload as Day).isPadding) {
    return;
  }

  const state = yield select((state: RootState) => state.calendar);
  const grid: Grid = {
    leftPadding: 0,
    currentMonth: 0,
    rightPadding: 0,
  };

  grid.leftPadding = getDay(
    new Date(state.visibleMonth.year, state.visibleMonth.month, 1)
  );

  const currentMonthDays = getDaysInMonth(
    new Date(state.visibleMonth.year, state.visibleMonth.month)
  );

  grid.currentMonth = currentMonthDays;
  const nextMultipleOfSeven =
    currentMonthDays + 7 - (currentMonthDays % 7 || 7);

  grid.rightPadding =
    nextMultipleOfSeven - (currentMonthDays + grid.leftPadding);

  if (grid.rightPadding < 0) {
    grid.rightPadding += 7; // complete another row
  }

  yield put(gridCalculated(grid));
}

function* _calculateGridWatcher() {
  yield takeLatest(
    [
      dayClicked.type,
      previousMonthClicked.type,
      nextMonthClicked.type,
      calculateGrid.type,
    ],
    _calculateGrid
  );
}

export function* calendarSagas() {
  yield all([_calculateGridWatcher()]);
}
