import { Dialog } from '@headlessui/react';
import React, { Dispatch, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

import { ProjectWorkPropsContainer } from '../../c2gin/lowdb';
import Modal from '../modals';
import { ActionsGroup } from '../../reducers/workgroups';

type ContainerHeaderProps = {
  name: string;
  dispatch: Dispatch<ActionsGroup>;
  handleSave: () => void;
};

const ContainerHeader = ({
  name,
  dispatch,
  handleSave,
}: ContainerHeaderProps) => {
  const [open, setOpen] = useState(false);

  const inputGroupNameRef = useRef<HTMLInputElement>(null);
  const inputGroupDescriptionRef = useRef<HTMLInputElement>(null);

  const btnSaveRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const handleAddGroup = () => {
    const group: ProjectWorkPropsContainer = {
      id: nanoid(12),
      title: inputGroupNameRef.current?.value || '',
      description: inputGroupDescriptionRef.current?.value || '',
      list: [],
    };

    dispatch({ type: 'add', id: group.id, group });

    closeModal();
  };

  const handleSaveWrapper = () => {
    if (!btnSaveRef.current) {
      return;
    }

    btnSaveRef.current.innerHTML = 'saving...';
    btnSaveRef.current.disabled = true;

    handleSave();
    btnSaveRef.current.disabled = false;
    btnSaveRef.current.innerHTML = 'save';
  };

  return (
    <>
      <div className="py-2 flex items-center justify-between">
        <h2 className="text-xl font-bold text-indigo-600 tracking-wider">
          {name}
        </h2>
        <div>
          <button
            onClick={openModal}
            type="button"
            className="bg-indigo-300 hover:bg-indigo-400 text-white px-2 py-1 rounded-lg text-sm"
          >
            new work group
          </button>
          <button
            ref={btnSaveRef}
            type="button"
            className="ml-2 border p-1 text-sm rounded-lg"
            onClick={handleSaveWrapper}
          >
            save
          </button>
        </div>
      </div>
      <hr />

      <Modal open={open} onClose={closeModal} focusRef={inputGroupNameRef}>
        <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
          Add a new work category
        </Dialog.Title>
        <div className="mt-2">
          <div className="flex flex-col my-1">
            <p className="">Title of the Category</p>
            <input
              ref={inputGroupNameRef}
              type="text"
              placeholder="Input your project's new work category"
              className="tracking-wide py-2 px-3 rounded-lg border-2 focus:outline-none hover:border-indigo-300 focus:border-indigo-300"
            />
          </div>
          <div className="flex flex-col my-1">
            <p>Description for the category</p>
            <input
              ref={inputGroupDescriptionRef}
              type="text"
              placeholder="A description for the group category"
              className="tracking-wide py-1 px-3 rounded-lg border-2 focus:outline-none hover:border-indigo-300 focus:border-indigo-300"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
            onClick={handleAddGroup}
          >
            Create WorkGroup
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ContainerHeader;
