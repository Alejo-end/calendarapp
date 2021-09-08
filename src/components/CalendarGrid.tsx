import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, GridItem } from "@chakra-ui/react";
import { dayClicked, remindersMetaAdapter } from "../redux/reducers";
import { Day as DayType, Reminder } from "../typings";
import { Day } from "./Day";
import { selectReminders, selectSelectedDate } from "../redux/selectors";
import { CalendarUtils } from "../lib";

type Props = { days: DayType[] };

export const CalendarGrid: React.FC<Props> = ({ days }) => {
  const dispatch = useDispatch();
  const handleClick = (day: DayType) => {
    dispatch(dayClicked(day));
  };

  const selectedDate = useSelector(selectSelectedDate);
  const remindersByDate = useSelector(selectReminders);
  const present = new Date();
  const presentYear = present.getFullYear();
  const presentMonth = present.getMonth();
  const presentDay = present.getDate();

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={6}>
      {days.map((day) => {
        const isPresentDay =
          day.day === presentDay &&
          day.month === presentMonth &&
          day.year === presentYear;

        const isSelectedDay =
          day.day === selectedDate.day &&
          day.month === selectedDate.month &&
          day.year === selectedDate.year;

        let reminders: Reminder[] = [];
        const dateString = CalendarUtils.createDateString(day);
        if (remindersByDate[dateString]) {
          reminders = remindersMetaAdapter
            .getSelectors()
            .selectAll(remindersByDate[dateString]);
        }

        return (
          <GridItem key={dateString}>
            <Day
              day={day.day}
              month={day.month}
              year={day.year}
              isPadding={day.isPadding}
              isPresentDay={isPresentDay}
              isSelectedDay={isSelectedDay}
              reminders={reminders}
              onClick={handleClick}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};
