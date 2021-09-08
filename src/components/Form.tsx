import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newReminderFormSubmitted } from "../redux/reducers";
import { selectSelectedDateAsString } from "../redux/selectors";
import { CreateReminderDto } from "../typings";

export const NewReminderForm: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDateAsString = useSelector(selectSelectedDateAsString);
  const [dto, setDto] = useState<CreateReminderDto>({
    data: { hour: 0, text: "" },
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

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dto.data.hour >= 0 && dto.data.hour <= 1439 && dto.data.text.trim()) {
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
        data: { hour: 0, text: "" },
      }));
    } else {
      alert("Invalid DTO");
    }
  };

  return (
    <form style={{ display: "flex", gap: "0.5rem" }} onSubmit={handleSumbit}>
      <span style={{ display: "flex", gap: "0.25rem" }}>
        <label htmlFor="text">text</label>
        <input
          name="text"
          type="text"
          value={dto.data.text}
          onChange={handleChange}
          style={{ color: "black" }}
        />
      </span>
      <span style={{ display: "flex", gap: "0.25rem" }}>
        <label htmlFor="hour">hour</label>
        <input
          name="hour"
          type="number"
          value={dto.data.hour}
          onChange={handleChange}
          style={{ color: "black" }}
        />
      </span>
      <input type="submit" style={{ display: "none" }} />
    </form>
  );
};
