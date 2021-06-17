import { Dialog } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react';
import Modal from '../../components/modals';
import useWorkGroup from '../../hooks/useWorkGroup';

type RemoveWorkGroupProps = { groupid: string };

export default function RemoveWorkGroup({ groupid }: RemoveWorkGroupProps) {
  const [open, setOpen] = useState(false);

  const { dispatch } = useWorkGroup();

  const btnCloseModal = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const handleRemoveGroup = () => {
    dispatch({
      type: 'remove',
      id: groupid,
    });

    closeModal();
  };

  return (
    <>
      <button type="button" onClick={openModal} title="Remove group">
        <TrashIcon className="h-5 w-5" />
      </button>

      <Modal open={open} onClose={closeModal} focusRef={btnCloseModal}>
        <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
          Are you sure you want to remove this group?
        </Dialog.Title>
        <div className="mt-2">
          <p>This action is not ireverssible.</p>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="mx-1 py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
            onClick={handleRemoveGroup}
          >
            Remove Group
          </button>
          <button
            type="button"
            className="mx-1 py-2 px-8 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}
