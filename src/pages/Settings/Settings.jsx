import { useQuery } from '@tanstack/react-query';
import { TbClipboardText, TbBell, TbCalendar, TbEdit } from 'react-icons/tb';
import { BiUser } from 'react-icons/bi';

import { Link, useNavigate } from 'react-router-dom';

import { getUserInfo } from '../../lib/api/userApi';
import Header from '../../components/shared/Header';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import Loading from '../../components/shared/Loading';

export default function Settings() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
  });

  if (error) {
    navigate('/notfound');
    return;
  }

  if (isLoading || !data) {
    return (
      <Modal>
        <Loading className="h-2 w-2 bg-indigo-200" />
      </Modal>
    );
  }

  const { user } = data;

  return (
    <>
      <Header>설정</Header>
      <section className="mb-8">
        <div className="mx-5 mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <BiUser className="mr-2 text-xl" />
            <span className="font-bold">내 정보</span>
          </div>
          <Link to="/edit/user">
            <TbEdit className="text-slate-500" />
          </Link>
        </div>
        <div className="mx-5 flex flex-col rounded-lg border border-indigo-200 p-3 text-sm">
          <div className="flex items-center justify-between px-3 py-1 text-sm">
            <p className="w-24">닉네임</p>
            <p
              className={`flex-1 font-bold ${
                user.nickname ? '' : 'text-xs font-light text-slate-400'
              }`}
            >
              {user.nickname || '입력해주세요'}
            </p>
          </div>
          <div className="flex items-center justify-between px-3 py-1 text-sm">
            <p className="w-24">성별</p>
            <p
              className={`flex-1 font-bold ${
                user.gender ? '' : 'text-xs font-light text-slate-400'
              }`}
            >
              {user.gender || '입력해주세요'}
            </p>
          </div>
          <div className="flex items-center justify-between px-3 py-1 text-sm">
            <p className="w-24">나이대</p>
            <p
              className={`flex-1 font-bold ${
                user.age ? '' : 'text-xs font-light text-slate-400'
              }`}
            >
              {user.age || '입력해주세요'}
            </p>
          </div>
          <div className="flex items-center justify-between px-3 py-1 text-sm">
            <p className="w-24">지역</p>
            <p
              className={`flex-1 font-bold ${
                user.region ? '' : 'text-xs font-light text-slate-400'
              }`}
            >
              {user.region || '입력해주세요'}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-2 ml-5 flex items-center">
          <TbClipboardText className="mr-2 text-xl" />
          <span className="font-bold">기록</span>
        </div>
        <div className="mx-5 grid grid-cols-2 gap-x-10 gap-y-5 rounded-lg border border-indigo-200 p-3 text-sm">
          <div className="flex justify-between">
            <p>기록한 하루</p>
            <p className="font-bold">{user.diary.length}일</p>
          </div>
          <div className="flex justify-between">
            <p>올린 사진</p>
            <p className="font-bold">10장</p>
          </div>
          <div className="flex justify-between">
            <p>날려보낸 풍선</p>
            <p className="font-bold">{user.balloons.length}개</p>
          </div>
          <div className="flex justify-between">
            <p>터트린 풍선</p>
            <p className="font-bold">5개</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-2 ml-5 flex items-start justify-between">
          <div className="flex">
            <TbBell className="mr-2 text-xl" />
            <span className="font-bold">알림 ON/OFF</span>
          </div>
          <div className="mx-5 flex flex-col items-center justify-between text-sm">
            <div className="mb-2 h-6 w-10 rounded-full bg-slate-300 p-[2px]">
              <Button className="h-5 w-5 rounded-full bg-white" />
            </div>
            <p className="text-xs">오후 10:00</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-2 ml-5 flex items-center justify-between">
          <div className="flex">
            <TbCalendar className="mr-2 text-xl" />
            <span className="font-bold">한 주의 시작</span>
          </div>
          <div className="mx-5 flex items-center justify-between gap-3 text-sm">
            <Button className="w-20 border border-blue-400 bg-blue-100 px-5 text-xs font-bold text-blue-400">
              일요일
            </Button>
            <Button className="w-20 border border-slate-400 bg-slate-100 px-5 text-xs font-bold text-slate-400">
              월요일
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
