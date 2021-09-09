import { Box, Button, HStack, Text, Image } from "@chakra-ui/react";
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


const _Reminder: React.FC<ReminderType> = ({id, text, city, isCompleted, hour}) => {
  const dispatch = useDispatch();
  //const selectedDate = useSelector(selectSelectedDate);
  const [icon, setIcon] = useState<any>({});

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      const data = await response.json();
      console.log(data)
      console.log(data.weather)
      data.weather.map(value => (
        setIcon(value.icon)
      ))
    };
    fetchWeather();
  }, [city]);

  const handleDelete = async (reminder: DeleteReminderDto) => {
    dispatch(reminderDeleteClicked(reminder));
  };

  const handleEdit = async (reminder: UpdateReminderDto) => {
    dispatch(editReminderClicked(reminder));
  };

  return (
    <Box rounded={10} borderWidth="1px" borderColor="gray.200" p={4}>
      <HStack spacing={5} w="100%" justifyContent="center">
        {/*<Icon>
          <Text fontSize="xl">{icon}</Text>
        </Icon>*/}
        <Image src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
        <Box>
          <Text fontSize="xl">{city}</Text>
        </Box>
        <Box>
          <Text fontSize="xl">{text}</Text>
        </Box>
        <Box>
          <Text fontSize="xl">{hour}</Text>
        </Box>
        <Box>
          <HStack spacing={5}>
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
