import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BiUser } from 'react-icons/bi';

import { kakaoLogout } from '../../lib/api/authApi';
import { getUserInfo, updateUserInfo } from '../../lib/api/userApi';
import { useAuthContext } from '../../context/AuthContext';
import EditUserInfoModal from './EditUserInfoModal';
import InputUserInfoField from './InputUserInfoField';
import Header from '../../components/shared/Header';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import Loading from '../../components/shared/Loading';

const INITIAL_VALUE = {
  nickname: '',
  gender: '',
  region: '',
  age: '',
};

export default function EditUserInfo() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
  });

  const [originalData, setOriginalData] = useState(INITIAL_VALUE);
  const [updatedData, setUpdatedData] = useState(INITIAL_VALUE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    if (data && data.user) {
      const { nickname, gender, region, age } = data.user;

      setOriginalData({ nickname, gender, region, age });
      setUpdatedData({ nickname, gender, region, age });
    }

    if (error) {
      navigate('/notfound');
    }
  }, [data, error, navigate]);

  function handleUpdate(key, value) {
    setUpdatedData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const changes = Object.keys(updatedData).reduce((acc, key) => {
      if (updatedData[key] !== originalData[key]) {
        acc[key] = updatedData[key];
      }

      return acc;
    }, {});

    if (Object.keys(changes).length > 0) {
      try {
        await updateUserInfo(changes);
        navigate('/settings');
      } catch (err) {
        console.error(err);
      }
    }
  }

  if (isLoading) {
    return (
      <Modal>
        <Loading className="h-2 w-2 bg-indigo-200" />
      </Modal>
    );
  }

  async function handleLogout() {
    try {
      const res = await kakaoLogout(data.user.kakaoId);

      if (res.result === 'ok') {
        logout();
        navigate('/login');
      }
    } catch (error) {
      navigate('/notfound');
    }
  }

  function openModal(type) {
    setModalType(type);
    setIsModalOpen(true);
  }

  function handleSelect(info) {
    handleUpdate(modalType, info);
  }

  return (
    <div className="relative flex h-screen w-full flex-col">
      {isModalOpen && (
        <EditUserInfoModal
          type={modalType}
          onSelect={handleSelect}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <Header backLink>
        <p className="mx-auto">설정</p>
      </Header>
      <section className="mb-8">
        <div className="mx-5 mb-2 flex items-center">
          <BiUser className="mr-2 text-xl" />
          <span className="font-bold">내 정보</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-5 flex flex-col rounded border border-indigo-200 p-3 text-sm"
        >
          <InputUserInfoField
            label="닉네임"
            name="nickname"
            value={updatedData.nickname}
            onChange={(e) => {
              handleUpdate(e.target.name, e.target.value);
            }}
          />
          <InputUserInfoField
            label="성별"
            value={updatedData.gender}
            onClick={() => openModal('gender')}
          />
          <InputUserInfoField
            label="나이대"
            value={updatedData.age}
            onClick={() => openModal('age')}
          />
          <InputUserInfoField
            label="지역"
            value={updatedData.region}
            onClick={() => openModal('region')}
          />
          <Button
            type="submit"
            className="mx-auto mb-2 mt-5 border border-indigo-400 bg-indigo-50 px-5 font-bold"
          >
            저장
          </Button>
        </form>
      </section>

      <section className="flex flex-col">
        <Button
          onClick={handleLogout}
          className="mx-5 mb-8 w-24 border border-indigo-200 bg-slate-50 text-sm font-bold"
        >
          로그아웃
        </Button>
        <Button className="mx-5 mb-8 w-24 border border-indigo-200 bg-slate-50 text-sm font-bold">
          회원탈퇴
        </Button>
      </section>
    </div>
  );
}
