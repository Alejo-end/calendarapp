import React from "react";
import { Grid, GridItem } from "@chakra-ui/layout";
import { ChakraProvider, Flex, theme, Box } from "@chakra-ui/react";
import { store } from "../store/store";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
  Provider as ReduxProvider,
} from "react-redux";
import { CalendarGrid } from "../components/CalendarGrid";
import {
  calculateGrid,
  nextMonthClicked,
  previousMonthClicked,
} from "../redux/reducer";
import { selectGridDays, selectVisibleMonth } from "../redux/selectors";
import { CalendarConstants } from "../lib";

const Calendar = () => {
  const dispatch = useDispatch();
  const visibleMonth = useSelector(selectVisibleMonth);
  const days = useSelector(selectGridDays);
  useEffect(() => {
    dispatch(calculateGrid());
  }, [dispatch]);

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Grid>
          <Flex>
            <p>
              {CalendarConstants.MONTH_INDEX_TO_NAME_MAP[visibleMonth.month]}
            </p>
            <p>{visibleMonth.year}</p>
          </Flex>
          <Box>
            <Flex>
              <button
                onClick={() => {
                  dispatch(previousMonthClicked());
                }}
              >
                {"<"}
              </button>
              <button
                onClick={() => {
                  dispatch(nextMonthClicked());
                }}
              >
                {">"}
              </button>
            </Flex>
            <Grid templateColumns="repeat(7, 1fr)" gap={6}>
              {CalendarConstants.WEEKDAYS.map((weekday) => (
                <GridItem
                  key={weekday}
                  style={{ color: "yellowgreen", textTransform: "uppercase" }}
                >
                  <span>{weekday}</span>
                </GridItem>
              ))}
            </Grid>

            <CalendarGrid days={days} />
          </Box>
        </Grid>
      </ChakraProvider>
    </ReduxProvider>
  );
};

export default Calendar;
