import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  TbUpload,
  TbListDetails,
  TbEdit,
  TbTrash,
  TbCaretDownFilled,
} from 'react-icons/tb';

import Header from '../../components/shared/Header';
import MonthSelectModal from './MonthSelectModal';
import {
  getDailyDiary,
  getMonthlyDiary,
  postDiary,
} from '../../lib/api/diaryApi';
import Button from '../../components/shared/Button';
import Calendar from './Calendar';

const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  // const { data: monthlyData } = useQuery({
  //   queryKey: ['monthlyDiary'],
  //   queryFn: getMonthlyDiary,
  // });
  // console.log('get_monthly', monthlyData);

  // const { data: dailyData } = useQuery({
  //   queryKey: ['dailyDiary'],
  //   queryFn: () => getDailyDiary(),
  // });

  // console.log('get_daily', dailyData);

  // const { data: postResponse } = useQuery({
  //   queryKey: ['postDiary'],
  //   queryFn: () => postDiary(),
  // });

  // console.log('post', postResponse.diaryId);

  // useEffect(() => {
  //   getMonthlyDiary();
  // }, []);

  function handleMonthSelect() {}

  return (
    <div>
      {isModalOpen && (
        <MonthSelectModal closeModal={() => setIsModalOpen(false)} />
      )}
      <Header>두둥실</Header>
      <div>
        <section>
          <div className="mr-5 flex justify-end gap-2">
            <TbUpload />
            <TbListDetails />
          </div>
          <Calendar />
        </section>
        <section>
          <div className="mr-5 flex justify-end gap-2">
            <TbEdit />
            <TbTrash />
          </div>
          <div className="mx-5 my-3 rounded-md border border-indigo-200">
            <div className="">
              <div>감정아이콘</div>
              <div>세부행동 아이콘</div>
              <div>일기</div>
              <div>사진</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
