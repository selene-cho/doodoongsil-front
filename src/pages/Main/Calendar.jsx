import { useState, useEffect } from 'react';
import {
  getMonth,
  getYear,
  eachDayOfInterval,
  startOfWeek,
  endOfMonth,
  format,
} from 'date-fns';

export default function Calendar({ startWeek }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  const daysOfWeek =
    startWeek === '일'
      ? ['일', '월', '화', '수', '목', '금', '토']
      : ['월', '화', '수', '목', '금', '토', '일'];

  const yearRange = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i,
  );

  useEffect(() => {
    const start = startOfWeek(currentDate, {
      weekStartsOn: startWeek === '일' ? 0 : 1,
    });

    const end = endOfMonth(currentDate);

    setCalendarDays(eachDayOfInterval({ start, end }));
  }, [currentDate, startWeek]);

  function handleMonthChange(e) {
    setCurrentDate(
      new Date(getYear(currentDate), parseInt(e.target.value, 10), 1),
    );
  }

  function handleYearChange(e) {
    setCurrentDate(
      new Date(parseInt(e.target.value, 10), getMonth(currentDate), 1),
    );
  }

  return (
    <div>
      <section>
        <select value={getYear(currentDate)} onChange={handleYearChange}>
          {yearRange.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select value={getMonth(currentDate)} onChange={handleMonthChange}>
          {[...Array(12).keys()].map((month) => (
            <option key={month} value={month}>
              {format(new Date(getYear(currentDate), month), 'MMMM')}
            </option>
          ))}
        </select>
      </section>
      <section className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`text-center ${
              format(day, 'MMMM') !== format(currentDate, 'MMMM')
                ? 'text-gray-400'
                : ''
            }`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </section>
    </div>
  );
}
