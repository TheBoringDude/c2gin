import { Dialog } from '@headlessui/react';
import { nanoid } from 'nanoid';
import React, { useReducer, useRef, useState } from 'react';
import Modal from '../../components/modals';
import useCurrentProject from '../../hooks/useCurrentProject';
import { ProjectTagsSchema } from '../../lib/lowdb';
import { handleTagsSave } from '../../lib/queries';
import TagsReducer from '../../reducers/tags';
import ListTags from './list-tags';

export default function TagManager() {
  const [open, setOpen] = useState(false);

  const cancelBtnRef = useRef<HTMLButtonElement>(null);
  const inputTagRef = useRef<HTMLInputElement>(null);

  const { tags, setTags } = useCurrentProject();

  const [state, dispatch] = useReducer(TagsReducer, tags);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const handleAddTag = () => {
    if (!inputTagRef.current) return;

    const tagName = inputTagRef.current?.value;
    if (!tagName) return;

    const newTag: ProjectTagsSchema = {
      name: tagName,
      id: `tag-${nanoid(15)}`,
    };

    inputTagRef.current.value = '';

    dispatch({ type: 'add', tag: newTag });

    setTags(state);
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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

          <hr className="my-2" />

          <ListTags dispatch={dispatch} tags={state} />
        </div>

        <div className="mt-4">
          <button
            className="mr-1 border py-2 px-8 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
            ref={cancelBtnRef}
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
            onClick={() => {
              if (tags !== state) {
                handleTagsSave(state);
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
