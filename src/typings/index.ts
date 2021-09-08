import { EntityState } from "@reduxjs/toolkit";

export type Date = {
  day: number;
  month: number;
  year: number;
};

export interface Day extends Date {
  isPadding: boolean;
}

export interface CalendarState {
  grid?: Grid;
  isCalculatingGrid: boolean;
  selectedDate: SelectedDate;
  visibleMonth: VisibleMonth;
  remindersByDate: RemindersByDate;
}

export type SelectedDate = Date;
export type VisibleMonth = Pick<Date, "year" | "month">;
export interface Grid {
  leftPadding: number;
  currentMonth: number;
  rightPadding: number;
}

export interface Reminder {
  id: string;
  text: string;
  city: string;
  isCompleted: boolean;
  hour: number;
}

export interface RemindersByDate {
  [key: string]: EntityState<Reminder>;
}

export type CreateReminderDto = {
  data: Pick<Reminder, "text" | "city" | "hour">;
  date: string;
};

export type UpdateReminderDto = {
  data: Pick<Reminder, "text" | "city" | "hour" | "isCompleted">;
  reminderId: string;
  date: string;
};

export type DeleteReminderDto = {
  reminderId: string;
  date: string;
};
