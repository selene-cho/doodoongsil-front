import { Link, useLocation } from 'react-router-dom';
import { TbBalloonFilled } from 'react-icons/tb';
import { FaChartSimple } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';
import { HiCalendar } from 'react-icons/hi';

export default function Navbar() {
  const location = useLocation();

  function getIconStyle(path) {
    return location.pathname === path ? 'text-blue-500' : 'text-slate-400';
  }

  return (
    <nav className="absolute inset-x-0 bottom-0 flex w-full justify-evenly border-t border-slate-100 pb-8 pt-5 text-xl">
      <Link to="/">
        <HiCalendar className={getIconStyle('/')} />
      </Link>
      <Link to="/balloons">
        <TbBalloonFilled className={getIconStyle('/balloons')} />
      </Link>
      <Link to="/charts">
        <FaChartSimple className={getIconStyle('/charts')} />
      </Link>
      <Link to="/settings">
        <IoMdSettings className={getIconStyle('/settings')} />
      </Link>
    </nav>
  );
}
