import { Box, Button, HStack, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { /* useSelector, */ useDispatch } from "react-redux";
import {
  DeleteReminderDto,
  Reminder as ReminderType,
  UpdateReminderDto,
} from "../typings/index";
import { MdEdit, MdDelete } from "react-icons/md";
import { reminderDeleteClicked, editReminderClicked } from "../redux/reducers";
//import { selectSelectedDate } from "../redux/selectors";
const API_KEY = "60cea64e4f08433d8f5bd513354e4c69";

type Props = {
  reminder: ReminderType;
  completed: boolean;
};

const _Reminder: React.FC<Props> = ({ reminder }: Props) => {
  const dispatch = useDispatch();
  //const selectedDate = useSelector(selectSelectedDate);
  const [weather, setWeather] = useState<any>({});

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${reminder.city}&appid=${API_KEY}`
      );

      const data = await response.json();
      setWeather(data.weather);
    };
    fetchWeather();
  }, [reminder.city]);

  const handleDelete = async (reminder: DeleteReminderDto) => {
    dispatch(reminderDeleteClicked(reminder));
  };

  const handleEdit = async (reminder: UpdateReminderDto) => {
    dispatch(editReminderClicked(reminder));
  };

  return (
    <Box rounded={10} borderWidth="1px" borderColor="gray.200" p={4}>
      <HStack spacing={4}>
        <Box>
          <Text fontSize="xl">{weather.icon}</Text>
        </Box>
        <Box>
          <Text fontSize="xl">{reminder.city}</Text>
        </Box>
        <Box>
          <Text fontSize="xl">{reminder.text}</Text>
        </Box>
        <Box>
          <Text fontSize="xl">{reminder.id}</Text>
        </Box>
        <Box>
          <HStack spacing={4}>
            <Button rightIcon={<MdEdit />} onClick={() => handleEdit}>
              Edit
            </Button>
            <Button rightIcon={<MdDelete />} onClick={() => handleDelete}>
              Delete
            </Button>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
};

export const ReminderItem = _Reminder;
export default ReminderItem;
