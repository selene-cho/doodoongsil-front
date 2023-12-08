import React from 'react';

export default function Button({
  children,
  type = 'button',
  onClick,
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex w-fit items-center justify-center rounded px-2 py-1 ${className} `}
    >
      {children}
    </button>
  );
}
