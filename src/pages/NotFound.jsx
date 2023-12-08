import { TbAlertTriangleFilled } from 'react-icons/tb';

import Header from '../components/shared/Header';

export default function NotFound() {
  return (
    <div className="h-screen flex-col items-center justify-center">
      <Header backLink />
      <div className="my-auto flex h-[calc(100vh-110px)] flex-col items-center justify-center">
        <TbAlertTriangleFilled className="mb-3 text-3xl text-amber-500" />
        <h1 className="mb-8 text-xl font-extrabold">
          페이지를 찾을 수 없습니다
        </h1>
        <p>요청을 처리하는 중 오류가 발생했습니다</p>
        <p>잠시후 다시 시도해주세요</p>
      </div>
    </div>
  );
}
