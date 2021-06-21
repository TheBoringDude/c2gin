import { Dialog } from '@headlessui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Modal from '../../components/modals';
import useCurrentProject from '../../hooks/useCurrentProject';
import useWorkGroup from '../../hooks/useWorkGroup';
import { handleProjectSave, handleProjectTagsSave } from '../../lib/queries';
import EditProjectTags from './edit-project-tags';

const EditProject = () => {
  const [open, setOpen] = useState(false);

  const { selected, handleReRead } = useCurrentProject();
  const [tags, setTags] = useState<string[]>(
    selected?.tags ? selected?.tags : []
  );
  const { state } = useWorkGroup();

  const inputProjectRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const handlerWrapper = () => {
    if (selected) {
      handleProjectTagsSave(selected.id, tags);
      handleReRead();
    }

    // automatically save current selected project's progress
    if (selected?.works !== state) {
      handleProjectSave(selected?.id, state);
    }

    closeModal();
  };

  useHotkeys('ctrl+t', () => {
    openModal();
  });

  useEffect(() => {
    setTags(selected.tags ? selected.tags : []);
  }, [selected]);

  return (
    <>
      <button
        title="Edit Project"
        type="button"
        onClick={openModal}
        className="ml-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Modal open={open} onClose={closeModal} focusRef={inputProjectRef}>
        <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
          Edit Project
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
              defaultValue={selected.name}
              className="tracking-wide py-2 px-3 rounded-lg border-2 focus:outline-none hover:border-indigo-300 focus:border-indigo-300"
            />
          </div>
        </div>
        <EditProjectTags tags={tags} setTags={setTags} />
        <div className="mt-4">
          <button
            type="button"
            className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
            onClick={handlerWrapper}
          >
            Edit Project
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditProject;
