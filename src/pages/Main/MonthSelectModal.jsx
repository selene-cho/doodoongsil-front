import React from 'react';
import { IoClose } from 'react-icons/io5';

import Modal from '../../components/shared/Modal';
import Button from '../../components/shared/Button';

export default function MonthSelectModal({ closeModal }) {
  return (
    <Modal>
      <div className="border-md relative flex max-h-[300px] w-4/5 flex-col items-center justify-center  rounded-2xl bg-white p-5">
        <Button onClick={closeModal}>
          <IoClose className="absolute right-3 top-3 h-5 w-5 cursor-pointer" />
        </Button>
      </div>
    </Modal>
  );
}
