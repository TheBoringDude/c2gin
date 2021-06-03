import React, { useState, MutableRefObject } from 'react';
import { Dialog } from '@headlessui/react';
import { DocumentAddIcon } from '@heroicons/react/outline';

import Modal from './modals';
import useCurrentProject from '../hooks/useCurrentProject';
import useWorkGroup from '../hooks/useWorkGroup';
import { handleProjectSave } from '../c2gin/queries';

interface NewProjectHandlerProps {
  sideOpen: boolean;
  HandleCreateProject: () => void;
  inputProjectRef: MutableRefObject<HTMLInputElement | null>;
}

const NewProjectHandler = ({
  HandleCreateProject,
  inputProjectRef,
  sideOpen,
}: NewProjectHandlerProps) => {
  const [open, setOpen] = useState(false);

  const { selected } = useCurrentProject();
  const { state } = useWorkGroup();

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const handlerWrapper = () => {
    HandleCreateProject();

    // automatically save current selected project's progress
    if (selected?.works !== state) {
      handleProjectSave(selected?.id, state);
    }

    closeModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        title="Create a new project"
        className="py-1 text-sm rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white inline-flex items-center justify-center"
      >
        <DocumentAddIcon className="h-5 w-5" />
        {sideOpen && <span className="ml-1">New Project</span>}
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlerWrapper();
                }
              }}
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
