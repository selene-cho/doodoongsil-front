import { instance } from '.';

export async function kakaoLogin(code) {
  const res = await instance.post(
    '/auth/login/kakao',
    { code },
    { headers: { 'Content-Type': 'application/json' } },
  );

  return res.data;
}

export async function kakaoLogout(kakaoId) {
  const res = await instance.post('/auth/logout', { kakaoId });

  return res.data;
}
