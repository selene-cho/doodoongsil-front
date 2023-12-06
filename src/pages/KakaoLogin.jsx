import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/shared/Header';
import Loading from '../components/shared/Loading';

export default function KakaoLogin() {
  const { search } = useLocation();
  const navigate = useNavigate();

  async function confirmLogin() {
    const params = new URLSearchParams(search);
    const code = params.get('code');

    try {
      const getToken = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token: accessToken } = getToken.data;

      const getUserInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const {
        id: kakaoId,
        properties: { nickname },
      } = getUserInfo.data;

      const login = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        {
          kakaoId,
          nickname,
        },
        { headers: { 'Content-Type': 'application/json' } },
      );

      const { data } = login;

      if (data.result === 'ok') {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    confirmLogin();
  }, []);

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
