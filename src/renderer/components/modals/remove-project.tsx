import { Dialog } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react';
import db from '../../c2gin/lowdb';
import useCurrentProject from '../../hooks/useCurrentProject';
import useWorkGroup from '../../hooks/useWorkGroup';
import Modal from '../modals';

export default function RemoveProjectModal() {
  const [open, setOpen] = useState(false);

  const { handleReRead, selected, setSelected } = useCurrentProject();
  const { dispatch } = useWorkGroup();

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const btnCancelRef = useRef<HTMLButtonElement>(null);

  const handlerWrapper = () => {
    const projects = db.get('projects').value();
    // const index = projects.indexOf(selected);

    const newprojects = projects.filter((v) => selected.id !== v.id);

    db.set('projects', newprojects).write();

    dispatch({
      type: 'set',
      work: {},
    });

    setSelected('');
    handleReRead();
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="py-1 px-2 text-sm rounded-lg bg-red-200 hover:bg-red-400 text-white inline-flex items-center"
      >
        <TrashIcon className="h-5 w-5" />
        remove
      </button>

      <Modal open={open} onClose={closeModal} focusRef={btnCancelRef}>
        <Dialog.Title as="h3" className="text-xl font-bold text-gray-900">
          Remove Project
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-lg tracking-wide">
            Are you sure you want to remove this project?
          </p>
          <span className="text-gray-500">
            This action is not irreversible.
          </span>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="mx-1 py-2 px-8 bg-red-400 hover:bg-red-500 text-white rounded-lg"
            onClick={handlerWrapper}
          >
            Remove
          </button>
          <button
            type="button"
            className="mx-1 py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}