import React from "react";
import { Grid, GridItem } from "@chakra-ui/layout";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarGrid } from "../components/CalendarGrid";
import {
  calculateGrid,
  nextMonthClicked,
  previousMonthClicked,
} from "../redux/reducers";
import { selectGridDays, selectVisibleMonth } from "../redux/selectors";
import { CalendarConstants } from "../lib";
import { NewReminderForm } from "../components/NewReminderForm";

const Calendar = () => {
  const dispatch = useDispatch();
  const visibleMonth = useSelector(selectVisibleMonth);
  const days = useSelector(selectGridDays);
  useEffect(() => {
    dispatch(calculateGrid());
  }, [dispatch]);

  return (
    <Grid px={10}>
      <Grid templateColumns="repeat(2, 1fr)">
        <Box>
          <Flex width="100%" align="center" justify="center" my={5}>
            <Text mx={5} fontWeight="600" fontSize="20px">
              {CalendarConstants.MONTH_INDEX_TO_NAME_MAP[visibleMonth.month]}
            </Text>
            <Text mx={5} fontWeight="600" fontSize="20px">
              {visibleMonth.year}
            </Text>
          </Flex>
          <Flex width="100%" justify="center" justifyContent="space-evenly">
            <Button
              onClick={() => {
                dispatch(previousMonthClicked());
              }}
            >
              {"⬅"}
            </Button>
            <Button
              onClick={() => {
                dispatch(nextMonthClicked());
              }}
            >
              {"➡"}
            </Button>
          </Flex>
          <Box>
            <Grid templateColumns="repeat(7, 1fr)" gap={6}>
              {CalendarConstants.WEEKDAYS.map((weekday) => (
                <GridItem
                  key={weekday}
                  color="black"
                  textTransform="uppercase"
                  fontWeight="700"
                  textAlign="center"
                  p={2}
                >
                  <span>{weekday}</span>
                </GridItem>
              ))}
            </Grid>

            <CalendarGrid days={days} />
          </Box>
        </Box>
        <Flex width="100%" justify="center" justifyContent="center" pl={10}>
          <NewReminderForm />
        </Flex>
      </Grid>
    </Grid>
  );
};

export default Calendar;
