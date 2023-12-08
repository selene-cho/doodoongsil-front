import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';
import { kakaoLogin } from '../lib/api/authApi';
import Header from '../components/shared/Header';
import Loading from '../components/shared/Loading';

export default function KakaoCallback() {
  const { login } = useAuthContext();
  const { search } = useLocation();
  const navigate = useNavigate();

  async function confirmLogin(code) {
    try {
      const data = await kakaoLogin(code);
      console.log('data', data);

      if (data.result === 'error') {
        return navigate('/login');
      }

      login();
      navigate('/');
    } catch (error) {
      navigate('/login');

      console.error(error);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('code');

    if (code) {
      confirmLogin(code);
    }
  }, [search]);

  return (
    <div className="flex h-screen flex-col">
      <Header>로그인</Header>
      <div className="m-auto flex w-full flex-col items-center justify-center text-center">
        <p>로그인 중입니다</p>
        <p className="mb-5">잠시만 기다려주세요</p>
        <Loading />
      </div>
    </div>
  );
}
