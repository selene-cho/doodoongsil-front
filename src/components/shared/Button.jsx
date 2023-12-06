import React from 'react';

export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`${className} flex w-fit items-center justify-center rounded`}
    >
      {children}
    </button>
  );
}
