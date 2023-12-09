import React, { useState } from 'react';
import { getMonth, getYear, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { IoClose } from 'react-icons/io5';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

import Modal from '../../components/shared/Modal';
import Button from '../../components/shared/Button';

export default function MonthSelectModal({
  closeModal,
  initialDate,
  onConfirm,
}) {
  const [selectedYear, setSelectedYear] = useState(getYear(initialDate));
  const [selectedMonth, setSelectedMonth] = useState(getMonth(initialDate));
  const yearRange = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i,
  );

  const canDecreaseYear = selectedYear > yearRange[yearRange.length - 1];
  const canIncreaseYear = selectedYear < yearRange[0];

  function handleMonthChange(month) {
    setSelectedMonth(month);
  }

  function handleYearChange(e) {
    const newYear = parseInt(e.target.value, 10);

    setSelectedYear(newYear);
  }

  function handleYearDecrease() {
    if (canDecreaseYear) {
      setSelectedYear(selectedYear - 1);
    }
  }

  function handleYearIncrease() {
    if (canIncreaseYear) {
      setSelectedYear(selectedYear + 1);
    }
  }

  function handleConfirm() {
    onConfirm(new Date(selectedYear, selectedMonth, 1));
    closeModal();
  }

  return (
    <Modal>
      <div className="border-md relative flex max-h-[300px] w-4/5 flex-col items-center justify-center  rounded-2xl bg-white p-5">
        <Button onClick={closeModal}>
          <IoClose className="absolute right-3 top-3 h-5 w-5 cursor-pointer" />
        </Button>
        <div className="my-5 flex w-full justify-between">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="text-2xl font-extrabold"
          >
            {yearRange.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
          <div className="flex text-2xl text-blue-600">
            <TbChevronLeft
              onClick={handleYearDecrease}
              className={`cursor-pointer ${
                !canDecreaseYear ? 'text-gray-300' : ''
              }`}
            />
            <TbChevronRight
              onClick={handleYearIncrease}
              className={`cursor-pointer ${
                !canIncreaseYear ? 'text-gray-300' : ''
              }`}
            />
          </div>
        </div>
        <ul
          value={selectedMonth}
          className="grid w-full grid-cols-4 gap-x-3 gap-y-3"
        >
          {[...Array(12).keys()].map((month) => (
            <li
              key={month}
              onClick={() => handleMonthChange(month)}
              className={`flex h-9 w-14 cursor-pointer items-center justify-center rounded-lg ${
                month === selectedMonth
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200'
              }`}
            >
              {format(new Date(selectedYear, month), 'MMMM', {
                locale: ko,
              })}
            </li>
          ))}
        </ul>
        <Button
          onClick={handleConfirm}
          className="mt-5 w-full rounded-lg bg-indigo-400 font-bold text-white hover:bg-indigo-300 focus:bg-indigo-300"
        >
          확인
        </Button>
      </div>
    </Modal>
  );
}
