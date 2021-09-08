import { Date } from "../typings";

export const createDateString = (day: Date) =>
  `${day.day}-${day.month}-${day.year}`;
