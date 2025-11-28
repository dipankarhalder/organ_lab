import { useState, useEffect, useCallback, useMemo } from "react";
import { Larrow, Rarrow } from "../../icons";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export const Calender = ({ onDateClick, onYearChange, events = {} }) => {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    onYearChange?.(currentYear);
  }, [currentYear, onYearChange]);

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((y) => y - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((y) => y + 1);
  };

  const handleDayClick = useCallback(
    (day) => {
      const dateStr = formatDate(currentYear, currentMonth, day);
      setSelectedDate(dateStr);
      onDateClick?.(dateStr);
    },
    [currentYear, currentMonth, onDateClick]
  );

  const isToday = useCallback(
    (day) => {
      return (
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()
      );
    },
    [currentMonth, currentYear, today]
  );

  const calendarDays = useMemo(() => {
    const totalDays = getDaysInMonth(currentYear, currentMonth);
    const startDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div className="calendar-day empty" key={`empty-${i}`} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateStr = formatDate(currentYear, currentMonth, day);
      const dateObj = new Date(currentYear, currentMonth, day);
      const isWeekend = [0, 6].includes(dateObj.getDay());
      days.push(
        <div
          className={`calendar-day ${isToday(day) ? "today" : ""} ${selectedDate === dateStr ? "selected" : ""} ${isWeekend ? "weekend" : ""}`}
          key={day}
          onClick={() => handleDayClick(day)}
        >
          {day}
          {events[dateStr] && (
            <div className="event-dot" title={events[dateStr]} />
          )}
        </div>
      );
    }
    return days;
  }, [
    currentYear,
    currentMonth,
    selectedDate,
    events,
    isToday,
    handleDayClick,
  ]);

  const renderYearDropdown = () => {
    const years = [];
    for (let y = today.getFullYear() - 10; y <= today.getFullYear() + 10; y++) {
      years.push(
        <option value={y} key={y}>
          {y}
        </option>
      );
    }

    return (
      <select
        id="select-year"
        value={currentYear}
        onChange={(e) => setCurrentYear(Number(e.target.value))}
        className="calendar-year-select"
      >
        {years}
      </select>
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>{monthNames[currentMonth]}</h2>
        <div className="calender-btns">
          {renderYearDropdown()}
          <div className="calender-arrow">
            <button onClick={handlePrevMonth}>
              <Larrow />
            </button>
            <button onClick={handleNextMonth}>
              <Rarrow />
            </button>
          </div>
        </div>
      </div>
      <div className="calender-wrapper">
        <div className="calendar-grid">
          {daysOfWeek.map((day) => (
            <div className="calendar-day-name" key={day}>
              {day}
            </div>
          ))}
          {calendarDays}
        </div>
      </div>
    </div>
  );
};
