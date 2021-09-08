import { createSelector } from "reselect";
import { getDaysInMonth } from "date-fns";
import { selectRoot } from "../store/store";
import { Day } from "../typings";
import { CalendarUtils } from "../lib";

const _selectCalendarSlice = createSelector(
  selectRoot,
  ({ calendar }) => calendar
);

const _selectLeftPadding = createSelector(
  _selectCalendarSlice,
  ({ grid, visibleMonth: { year, month } }): number[] => {
    if (!grid) {
      return [];
    }

    let previousMonth = month - 1;
    if (previousMonth === -1) {
      previousMonth = 12;
      year -= 1;
    }

    const daysInPreviousMonth = getDaysInMonth(new Date(year, previousMonth));
    return new Array(grid.leftPadding)
      .fill(-1)
      .map((_, i) => daysInPreviousMonth - grid.leftPadding + i + 1);
  }
);

const _selectCurrentMonth = createSelector(
  _selectCalendarSlice,
  ({ grid }): number[] => {
    if (!grid) {
      return [];
    }

    const currentMonth: number[] = [];
    for (let i = 1; i <= grid.currentMonth; i++) {
      currentMonth.push(i);
    }

    return currentMonth;
  }
);

const _selectRightPadding = createSelector(
  _selectCalendarSlice,
  ({ grid }): number[] => {
    if (!grid) {
      return [];
    }

    const rightPadding: number[] = [];
    for (let i = 1; i <= grid.rightPadding; i++) {
      rightPadding.push(i);
    }

    return rightPadding;
  }
);

export const selectVisibleMonth = createSelector(
  _selectCalendarSlice,
  ({ visibleMonth }) => visibleMonth
);

export const selectSelectedDate = createSelector(
  _selectCalendarSlice,
  ({ selectedDate }) => selectedDate
);

export const selectGridDays = createSelector(
  _selectLeftPadding,
  _selectCurrentMonth,
  _selectRightPadding,
  selectVisibleMonth,
  (leftPadding, currentMonth, rightPadding, { month, year }): Day[] => {
    const leftPaddingDays: Day[] = leftPadding.map((day) => ({
      day,
      month: month === 0 ? 11 : month - 1,
      year: month === 0 ? year - 1 : year,
      isPadding: true,
    }));

    const visibleMonthDays: Day[] = currentMonth.map((day) => ({
      day,
      month,
      year,
      isPadding: false,
    }));

    const rightPaddingDays: Day[] = rightPadding.map((day) => ({
      day,
      month: month === 11 ? 0 : month + 1,
      year: month === 11 ? year + 1 : year,
      isPadding: true,
    }));

    return leftPaddingDays.concat(visibleMonthDays).concat(rightPaddingDays);
  }
);

export const selectReminders = createSelector(
  _selectCalendarSlice,
  ({ remindersByDate }) => remindersByDate
);

export const selectSelectedDateAsString = createSelector(
  selectSelectedDate,
  CalendarUtils.createDateString
);
