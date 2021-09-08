import React from "react";
import { Box, Text, Badge, VStack } from "@chakra-ui/react";
import { Day as DayType, Reminder } from "../typings/index";

type Props = {
  onClick: (day: DayType) => void;
  isPresentDay: boolean;
  isSelectedDay: boolean;
  reminders: Reminder[];
} & DayType;

const _Day: React.FC<Props> = ({
  day,
  month,
  year,
  isPadding,
  isPresentDay,
  isSelectedDay,
  reminders,
  onClick,
}) => (
  <Box
    p={"0.5em"}
    position="relative"
    minH="100px"
    w="180px"
    borderLeftRadius="lg"
    borderBottomRightRadius="lg"
    shadow="md"
    onClick={() => {
      onClick({ day, month, year, isPadding });
    }}
    color={
      isSelectedDay
        ? "purple"
        : isPresentDay
        ? "orange"
        : isPadding
        ? "#e6e6e6"
        : "gray"
    }
  >
    <Box
      position="absolute"
      right="0"
      top="0"
      fontSize="20"
      fontWeight="700"
      backgroundColor={
        isSelectedDay
          ? "purple"
          : isPresentDay
          ? "#FFE600"
          : isPadding
          ? "#efefef"
          : "lightseagreen"
      }
      color={
        isSelectedDay
          ? "white"
          : isPresentDay
          ? "black"
          : isPadding
          ? "gray"
          : "white"
      }
      p="2"
      borderBottomLeftRadius="lg"
      borderTopRightRadius="lg"
    >
      {day}
    </Box>
    <VStack m={2} justify="center" align="center">
      <Text fontWeight="600" fontSize="20px">
        Reminders:
      </Text>
      <Badge
        borderRadius="md"
        colorScheme={
          isPadding
            ? "lightgray"
            : isSelectedDay
            ? "purple"
            : isPresentDay
            ? "yellow"
            : "green"
        }
      >
        <Text fontSize="20">{reminders.length}</Text>
      </Badge>
    </VStack>
  </Box>
);

export const Day = React.memo(_Day);
