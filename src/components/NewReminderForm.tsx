import { FormControl, Input, VStack, Button } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newReminderFormSubmitted } from "../redux/reducers";
import { selectSelectedDateAsString } from "../redux/selectors";
import { CreateReminderDto } from "../typings";

export const NewReminderForm: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDateAsString = useSelector(selectSelectedDateAsString);
  const [dto, setDto] = useState<CreateReminderDto>({
    data: { hour: 0, text: "", city: "" },
    date: selectedDateAsString,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDto((current) => ({
      ...current,
      data: {
        ...current.data,
        [e.target.name]:
          e.target.name === "hour"
            ? parseInt(e.target.value) || ""
            : e.target.value,
      },
    }));
  };

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();
    if (dto.data.hour >= 0 && dto.data.hour <= 24 && dto.data.text.trim()) {
      dispatch(
        newReminderFormSubmitted({
          ...dto,
          date: selectedDateAsString,
          data: {
            ...dto.data,
            hour: Number(dto.data.hour),
          },
        })
      );

      setDto((current) => ({
        ...current,
        data: { hour: 0, text: "", city: "" },
      }));
      
    } else {
      alert("Invalid DTO");
    }
  };

  return (
    <FormControl
      style={{ display: "flex", gap: "0.5rem" }}
    >
      <VStack align="center" justify="center" width="100%">
        <label htmlFor="text">Text</label>
        <Input
          name="text"
          type="text"
          value={dto.data.text}
          onChange={handleChange}
          style={{ color: "black" }}
        />
        <label htmlFor="hour">Hour</label>
        <Input
          name="hour"
          value={dto.data.hour}
          onChange={handleChange}
          style={{ color: "black" }}
        />
        <label htmlFor="city">City</label>
        <Input
          name="city"
          value={dto.data.city}
          onChange={handleChange}
          style={{ color: "black" }}
        />
        <Button type="submit" onClick={handleSumbit} width="80%">Save</Button>
      </VStack>
    </FormControl>
  );
};
