import React from "react";
import Calendar from "react-calendar";

function EventCalendar({ value, onChange, onDateClick }) {
  return (
    <Calendar value={value} onChange={onChange} onClickDay={onDateClick} />
  );
}

export default EventCalendar;