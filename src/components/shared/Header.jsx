import { useNavigate } from 'react-router-dom';
import { TbArrowNarrowLeft } from 'react-icons/tb';

import Button from './Button';

export default function Header({ children, className, backLink }) {
  const navigate = useNavigate();

  return (
    <header
      className={`relative mb-5 flex h-[90px] w-full items-center justify-center border-b border-slate-300 pb-5 pt-10 text-center text-lg font-extrabold ${className}`}
    >
      {backLink && (
        <Button onClick={() => navigate(-1)}>
          <TbArrowNarrowLeft className="absolute left-5 text-2xl" />
        </Button>
      )}
      {children}
    </header>
  );
}
