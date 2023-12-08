import { instance } from '.';

export async function getMonthlyDiary() {
  const res = await instance.get('/diary');
  return res.data;
}

export async function getDailyDiary(diaryId) {
  const res = await instance.get(`/diary/${diaryId}`);
  return res.data;
}

export async function postDiary(diary) {
  const res = await instance.post(
    '/diary',
    { ...diary },
    { headers: { 'Content-Type': 'application/json' } },
  );

  return res.data;
}
