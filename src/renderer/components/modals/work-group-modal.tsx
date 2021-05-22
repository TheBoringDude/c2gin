import { Dialog } from '@headlessui/react';
import React, { MutableRefObject, ReactNode } from 'react';
import Modal from '../modals';

type WorkGroupModalProps = {
  open: boolean;
  closeModal: () => void;
  inputGroupNameRef: MutableRefObject<HTMLInputElement | null>;
  inputGroupDescriptionRef: MutableRefObject<HTMLInputElement | null>;
  nameDefValue: string;
  descriptionDefValue: string;
  children: ReactNode;
  dialogTitle: string;
};

export default function WorkGroupModal({
  open,
  closeModal,
  inputGroupDescriptionRef,
  inputGroupNameRef,
  nameDefValue,
  descriptionDefValue,
  dialogTitle,
  children,
}: WorkGroupModalProps) {
  return (
    <Modal open={open} onClose={closeModal} focusRef={inputGroupNameRef}>
      <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
        {dialogTitle}
      </Dialog.Title>
      <div className="mt-2">
        <div className="flex flex-col my-1">
          <p className="">Title of the Category</p>
          <input
            ref={inputGroupNameRef}
            type="text"
            defaultValue={nameDefValue}
            placeholder="Input your project's new work category"
            className="tracking-wide py-2 px-3 rounded-lg border-2 focus:outline-none hover:border-indigo-300 focus:border-indigo-300"
          />
        </div>
        <div className="flex flex-col my-1">
          <p>Description for the category</p>
          <input
            ref={inputGroupDescriptionRef}
            type="text"
            defaultValue={descriptionDefValue}
            placeholder="A description for the group category"
            className="tracking-wide py-1 px-3 rounded-lg border-2 focus:outline-none hover:border-indigo-300 focus:border-indigo-300"
          />
        </div>
      </div>

      <div className="mt-4">{children}</div>
    </Modal>
  );
}
