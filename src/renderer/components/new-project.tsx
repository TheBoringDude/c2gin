import React, { useState, MutableRefObject } from 'react';
import { Dialog } from '@headlessui/react';
import Modal from './modals';

interface NewProjectHandlerProps {
  HandleCreateProject: () => void;
  inputProjectRef: MutableRefObject<HTMLInputElement | null>;
}

const NewProjectHandler = ({
  HandleCreateProject,
  inputProjectRef,
}: NewProjectHandlerProps) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const handlerWrapper = () => {
    HandleCreateProject();
    closeModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="py-1 px-4 text-sm rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white"
      >
        New Project
      </button>

      <Modal open={open} onClose={closeModal} focusRef={inputProjectRef}>
        <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
          Create New Project
        </Dialog.Title>
        <div className="mt-2">
          <div className="flex flex-col">
            <p className="">What is your project&apos;s name?</p>
            <input
              ref={inputProjectRef}
              type="text"
              placeholder="Your project's name"
              className="tracking-wide py-2 px-3 rounded-lg border-2 focus:outline-none hover:border-indigo-300 focus:border-indigo-300"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
            onClick={handlerWrapper}
          >
            Create Project
          </button>
        </div>
      </Modal>
    </>
  );
};

export default NewProjectHandler;
