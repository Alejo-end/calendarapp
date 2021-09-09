import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Table, Tbody, Tr, Grid, GridItem, useDisclosure, Modal, ModalBody, ModalContent, ModalCloseButton, ModalOverlay, ModalHeader, ModalFooter, Button } from "@chakra-ui/react";
import { dayClicked, remindersMetaAdapter } from "../redux/reducers";
import { Day as DayType, Reminder } from "../typings";
import { Day } from "./Day";
import { selectReminders, selectSelectedDate } from "../redux/selectors";
import { CalendarUtils } from "../lib";
import ReminderItem from "./Reminder";

type Props = { days: DayType[] };

export const CalendarGrid: React.FC<Props> = ({ days }) => {

  const dispatch = useDispatch();

  const [reminders, setReminders] = useState<any>()
  
  const handleClick = (day: DayType) => {
    dispatch(dayClicked(day));
    const date = CalendarUtils.createDateString(day);
    if(remindersByDate[date] !== undefined) {
      const reminders = remindersByDate[date]['entities']
      const values = Object.values(reminders)
      setReminders(values)
      onOpen()
    } else {
      console.log("No reminders available")
    }
    
  };

  const selectedDate = useSelector(selectSelectedDate);
  const remindersByDate = useSelector(selectReminders);
  const present = new Date();
  const presentYear = present.getFullYear();
  const presentMonth = present.getMonth();
  const presentDay = present.getDate();

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={6}>
      {/*Modal Start*/}
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered size={'3xl'}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>
          Reminders
        </ModalHeader>
        <ModalCloseButton color="black"/>
        <ModalBody fontSize="3xl" fontFamily="Times New Roman">
        <Box mt={5} mb={10}>
          <Table variant="striped" colorScheme="blackAlpha">
            {/*<Thead>
              <Tr>
                <Th textAlign="center">Text</Th>
                <Th textAlign="center">City</Th>
                <Th textAlign="center">Time</Th>
              </Tr>
            </Thead>*/}
            <Tbody>
                {reminders ? reminders.map(reminder => (
                <Tr key={reminder.id}>
                  <ReminderItem 
                  id={reminder.id} 
                  text={reminder.text} 
                  city={reminder.city} 
                  isCompleted={reminder.isCompleted} 
                  hour={reminder.hour}/>
                </Tr>
                )) : null}
            </Tbody>    
          </Table>
        </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
      {/*Modal End*/}
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
