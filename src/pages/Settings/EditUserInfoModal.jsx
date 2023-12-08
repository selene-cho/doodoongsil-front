import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

import Modal from '../../components/shared/Modal';
import Button from '../../components/shared/Button';

export default function EditUserInfoModal({ type, onSelect, closeModal }) {
  const [selectedInfo, setSelectedInfo] = useState('');
  function getInfos(type) {
    switch (type) {
      case 'gender':
        return ['남', '여', '기타'];
      case 'region':
        return [
          '서울',
          '경기',
          '인천',
          '강원',
          '충북',
          '충남',
          '세종',
          '대전',
          '경북',
          '경남',
          '대구',
          '울산',
          '부산',
          '전북',
          '전남',
          '광주',
          '제주',
        ];
      case 'age':
        return [
          '10대',
          '20대',
          '30대',
          '40대',
          '50대',
          '60대',
          '70대',
          '80대 이상',
        ];
      default:
        return [];
    }
  }

  const infos = getInfos(type);

  function handleSelect(info) {
    setSelectedInfo(info);
  }

  function handleConfirm() {
    onSelect(selectedInfo);
    closeModal();
  }

  return (
    <Modal>
      <div className="border-md relative flex max-h-[300px] w-3/5 flex-col items-center justify-center  rounded-2xl bg-white p-5">
        <Button onClick={closeModal}>
          <IoClose className="absolute right-3 top-3 h-5 w-5 cursor-pointer" />
        </Button>
        <ul className="mt-3 max-h-[250px] w-full divide-y overflow-y-auto scroll-smooth text-center">
          {infos.map((info) => (
            <li
              key={info}
              onClick={() => handleSelect(info)}
              className={`cursor-pointer py-1 ${
                selectedInfo === info
                  ? 'font-bold text-blue-900'
                  : 'hover:font-bold hover:text-blue-900 focus:font-bold focus:text-blue-900'
              }`}
            >
              {info}
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
