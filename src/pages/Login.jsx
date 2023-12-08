import { FaComment } from 'react-icons/fa';

import Header from '../components/shared/Header';
import Button from '../components/shared/Button';

export default function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;

  function onClick() {
    window.location.href = KAKAO_AUTH_URL;
  }

  return (
    <div className="flex h-screen flex-col">
      <Header>로그인</Header>
      <Button
        onClick={onClick}
        className="m-auto bg-[#FEE500] px-5 py-2.5 hover:bg-[#fee500cf]"
      >
        <FaComment className="mr-2" />
        <span>kakao 계정으로 로그인</span>
      </Button>
    </div>
  );
}
