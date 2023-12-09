import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getMonth,
  getYear,
  eachDayOfInterval,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  format,
  isSameMonth,
  getDay,
} from 'date-fns';
import { TbCaretDownFilled } from 'react-icons/tb';

import { getUserInfo } from '../../lib/api/userApi';
import happy from '../../img/happy.png';
import MonthSelectModal from './MonthSelectModal';
import Button from '../../components/shared/Button';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
  });

  const startWeek = data?.user?.startWeek;

  const daysOfWeek =
    startWeek === '일'
      ? ['일', '월', '화', '수', '목', '금', '토']
      : ['월', '화', '수', '목', '금', '토', '일'];

  useEffect(() => {
    const firstDayOfMonth = startOfMonth(currentDate);

    const start = startOfWeek(firstDayOfMonth, {
      weekStartsOn: startWeek === '일' ? 0 : 1,
    });

    const end = endOfMonth(currentDate);

    const days = eachDayOfInterval({ start, end });

    const currentMonthDays = days.filter(
      (day) => isSameMonth(day, currentDate) || day >= firstDayOfMonth,
    );

    setCalendarDays(currentMonthDays);
  }, [currentDate, startWeek]);

  const emptyDays = Array(getDay(startOfMonth(currentDate))).fill(null);

  function handleChangeCalendar() {
    setIsModalOpen(true);
  }

  function handleConfirm(newDate) {
    setCurrentDate(newDate);
    setIsModalOpen(false);
  }

  return (
    <div>
      {isModalOpen && (
        <MonthSelectModal
          initialDate={currentDate}
          onConfirm={handleConfirm}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <section className="mb-5 flex flex-row justify-center">
        <Button onClick={handleChangeCalendar}>
          {getYear(currentDate)}년 {getMonth(currentDate) + 1}월
          <TbCaretDownFilled className="ml-1" />
        </Button>
      </section>
      <section className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="font text-center text-xs">
            {day}
          </div>
        ))}
        {emptyDays.map((_, index) => (
          <div key={index}></div>
        ))}
        {calendarDays.map((day) => {
          if (!isSameMonth(day, currentDate)) {
            return null;
          }
          return (
            <div key={day} className="text-center text-xs">
              <img src={happy} alt="happy" />
              {format(day, 'd')}
            </div>
          );
        })}
      </section>
    </div>
  );
}
