import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";

const CalenderOfMatches = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-of-matches-wrapper">
      <h1>Events Calendar</h1>
      <div className="custom-calendar-container">
        <Calendar 
          onChange={setDate} 
          value={date} 
          className="custom-calendar"
        />
      </div>
    </div>
  );
};

export default CalenderOfMatches;
