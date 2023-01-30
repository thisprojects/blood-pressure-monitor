import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePickerProps } from "@mui/x-date-pickers";

export default function BasicDatePicker({
  setDate,
  date,
}: {
  setDate: (date: Date) => void;
  date: Date;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Pick a Date"
        value={date}
        onChange={(newValue) => {
          setDate(newValue as Date);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
