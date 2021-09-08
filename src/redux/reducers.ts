import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import {
  CalendarState,
  CreateReminderDto,
  Day,
  UpdateReminderDto,
  DeleteReminderDto,
  Grid,
  Reminder,
} from "../typings";

export const remindersMetaAdapter = createEntityAdapter<Reminder>({
  sortComparer: (a, b) => a.hour - b.hour,
});

const present = new Date();
const initialState: CalendarState = {
  isCalculatingGrid: false,
  selectedDate: {
    year: present.getFullYear(),
    month: present.getMonth(),
    day: present.getDate(),
  },
  visibleMonth: {
    year: present.getFullYear(),
    month: present.getMonth(),
  },
  remindersByDate: {},
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    dayClicked: (state, event: PayloadAction<Day>) => {
      state.selectedDate.day = event.payload.day;
      if (event.payload.isPadding) {
        if (event.payload.day <= 6) {
          // right padding was clicked
          if (state.visibleMonth.month === 11) {
            state.visibleMonth.month = 0;
            state.visibleMonth.year += 1;
          } else {
            state.visibleMonth.month += 1;
          }
        } else {
          // left padding was clicked
          if (state.visibleMonth.month === 0) {
            state.visibleMonth.month = 11;
            state.visibleMonth.year -= 1;
          } else {
            state.visibleMonth.month -= 1;
          }
        }
      }

      state.selectedDate.month = state.visibleMonth.month;
      state.selectedDate.year = state.visibleMonth.year;
    },
    calculateGrid: (state) => {
      state.isCalculatingGrid = true;
    },
    gridCalculated: (state, event: PayloadAction<Grid>) => {
      state.grid = event.payload;
      state.isCalculatingGrid = false;
    },
    previousMonthClicked: (state) => {
      if (state.visibleMonth.month === 0) {
        state.visibleMonth.month = 11;
        state.visibleMonth.year -= 1;
      } else {
        state.visibleMonth.month -= 1;
      }
    },
    nextMonthClicked: (state) => {
      if (state.visibleMonth.month === 11) {
        state.visibleMonth.month = 0;
        state.visibleMonth.year += 1;
      } else {
        state.visibleMonth.month += 1;
      }
    },
    newReminderFormSubmitted: (
      state,
      event: PayloadAction<CreateReminderDto>
    ) => {
      if (!state.remindersByDate[event.payload.date]) {
        state.remindersByDate[event.payload.date] =
          remindersMetaAdapter.getInitialState();
      }

      state.remindersByDate[event.payload.date] = remindersMetaAdapter.addOne(
        state.remindersByDate[event.payload.date],
        {
          ...event.payload.data,
          isCompleted: false,
          id: uuid(),
        }
      );
    },
    editReminderClicked: (state, event: PayloadAction<UpdateReminderDto>) => {
      if (state.remindersByDate[event.payload.date]) {
        state.remindersByDate[event.payload.date] =
          remindersMetaAdapter.updateOne(
            state.remindersByDate[event.payload.date],
            {
              id: event.payload.reminderId,
              changes: event.payload.data,
            }
          );
      }
    },
    reminderDeleteClicked: (state, event: PayloadAction<DeleteReminderDto>) => {
      if (state.remindersByDate[event.payload.date]) {
        state.remindersByDate[event.payload.date] =
          remindersMetaAdapter.removeOne(
            state.remindersByDate[event.payload.date],
            event.payload.reminderId
          );
      }
    },
  },
});

export const {
  dayClicked,
  calculateGrid,
  gridCalculated,
  previousMonthClicked,
  nextMonthClicked,
  newReminderFormSubmitted,
  editReminderClicked,
  reminderDeleteClicked,
} = calendarSlice.actions;

export default calendarSlice.reducer;
