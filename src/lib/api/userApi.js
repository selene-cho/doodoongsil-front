import { instance } from '.';

export async function getUserInfo() {
  const res = await instance.get('/user');

  return res.data;
}

export async function updateUserInfo(userInfo) {
  const res = await instance.patch(
    '/user',
    { ...userInfo },
    { headers: { 'Content-Type': 'application/json' } },
  );

  return res.data;
}
