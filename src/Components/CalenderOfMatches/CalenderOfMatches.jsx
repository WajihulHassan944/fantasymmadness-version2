import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./style.css";

const CalenderOfMatches = () => {
  const [date, setDate] = useState(new Date());

  const handlePrevMonth = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };
  return (
    <div className="calendar-of-matches-wrapper">
      <h1>Events Calendar</h1>
      <div className="custom-calendar-container">
      <div className="custom-calendar-container">
      {/* Month Heading */}
      <h2 className="calendar-month">
        {date.toLocaleString("default", { month: "long", year: "numeric" })}
      </h2>

      {/* Calendar Component */}
      <Calendar
        onChange={setDate}
        value={date}
        className="custom-calendar"
        showNavigation={false} // Disables default navigation
      />

      <button className="calendar-arrow left" onClick={handlePrevMonth}>
        ❮
      </button>
      <button className="calendar-arrow right" onClick={handleNextMonth}>
        ❯
      </button>
    </div>
   </div>
    </div>
  );
};

export default CalenderOfMatches;
