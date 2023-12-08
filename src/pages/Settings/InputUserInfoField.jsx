import { TbCaretDownFilled } from 'react-icons/tb';

import Button from '../../components/shared/Button';

export default function InputUserInfoField({
  label,
  name,
  value,
  onChange,
  onClick,
}) {
  return (
    <div className="flex items-center justify-between px-3 py-1 text-sm">
      <p className="w-24">{label}</p>
      {onClick ? (
        <Button
          onClick={onClick}
          className="flex-1 rounded-md border border-slate-100 bg-gray-50 py-1.5  focus:border-blue-400"
        >
          <div className="flex w-full justify-between px-1">
            <p className="text-xs">{value || '선택'}</p>
            <TbCaretDownFilled />
          </div>
        </Button>
      ) : (
        <input
          className="flex-1 border border-slate-100 px-2 py-1 font-bold"
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
