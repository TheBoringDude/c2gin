import { Dialog } from '@headlessui/react';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import Modal from '../../components/modals';
import useCurrentProject from '../../hooks/useCurrentProject';
import { handleTagsSave } from '../../lib/queries';
import TagsManagerReducer from '../../reducers/tags-manager';
import ListTags from './list-tags';

type TagManagerProps = {
  sideOpen: boolean;
};

export default function TagManager({ sideOpen }: TagManagerProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const saveBtnRef = useRef<HTMLButtonElement>(null);
  const inputTagRef = useRef<HTMLInputElement>(null);

  const { tags, dispatchTags } = useCurrentProject();

  const [state, dispatch] = useReducer(TagsManagerReducer, tags);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  /* handler for adding a new tag */
  const handleAddTag = () => {
    if (!inputTagRef.current) return;

    const tagName = inputTagRef.current?.value.trim();
    if (!tagName) return;

    // check if it exists already
    const check = tags.filter((t) => t.name === tagName)[0];
    if (check) {
      setError('Tag already exists!');
      return;
    }

    inputTagRef.current.value = '';

    dispatch({ type: 'add', name: tagName });
    setError(null);
  };

  /* handle for saving the tags */
  const handleSaveTag = () => {
    handleTagsSave(state);
    dispatchTags({ type: 'set', state });
  };

  useEffect(() => {
    if (!saveBtnRef.current) return;

    if (state === tags) {
      saveBtnRef.current.disabled = true;
    } else {
      saveBtnRef.current.disabled = false;
    }
  }, [tags, state]);

  return (
    <>
      <button
        className="border dark:border-gray-600 rounded-lg p-1 text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 text-sm inline-flex items-center"
        type="button"
        title="Open Tag Manager"
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${sideOpen && 'mr-1'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
        {sideOpen && 'tag manager'}
      </button>

      <Modal
        open={open}
        onClose={() => {
          if (tags === state) {
            closeModal();
          }
        }}
        focusRef={inputTagRef}
      >
        <div className="text-center">
          <Dialog.Title as="h3" className="text-xl font-bold tracking-wide">
            Tag Manager
          </Dialog.Title>
          <p>Edit and manage your project tags</p>
        </div>

        <div className="mt-2 p-4">
          <div className="flex flex-row">
            <input
              ref={inputTagRef}
              type="text"
              className="w-full border mr-2 py-2 px-4 rounded-lg"
              placeholder="Input a new tag category"
              maxLength={15}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();

                  handleAddTag();
                  e.currentTarget.focus();
                }

                // prevent comma addition
                if (e.key === ',') {
                  e.preventDefault();
                }
              }}
            />
            <button
              title="Create a New Tag"
              onClick={handleAddTag}
              type="button"
              className="px-4 py-2 inline-flex items-center rounded-lg bg-blue-400 hover:bg-blue-500 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              add
            </button>
          </div>

          {/* a simple validation message */}
          {error && (
            <p className="mt-1 text-red-500 text-sm tracking-wide">{error}</p>
          )}

          <hr className="my-2" />

          <ListTags dispatch={dispatch} tags={state} />
        </div>

        <div className="mt-4">
          <button
            className="mr-1 border py-2 px-8 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
            ref={cancelBtnRef}
            type="button"
            onClick={() => {
              closeModal();

              dispatch({ type: 'set', state: tags }); // reset the reducer data
            }}
          >
            Cancel
          </button>
          <button
            ref={saveBtnRef}
            type="button"
            className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg disabled:opacity-80 disabled:hover:bg-indigo-400"
            onClick={() => {
              if (tags !== state) {
                handleSaveTag();
              }
            }}
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}
