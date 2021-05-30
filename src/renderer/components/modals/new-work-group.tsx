import React, { useRef, useState, KeyboardEvent } from 'react';
import { DocumentTextIcon } from '@heroicons/react/outline';
import { nanoid } from 'nanoid';

import useWorkGroup from '../../hooks/useWorkGroup';
import { ProjectWorkPropsContainer } from '../../c2gin/lowdb';
import WorkGroupModal from './work-group-modal';
import { GroupColors } from '../../c2gin/colors';

export default function NewWorkGroupHandler() {
  const [open, setOpen] = useState(false);

  const { dispatch } = useWorkGroup();

  const inputGroupNameRef = useRef<HTMLInputElement>(null);
  const inputGroupDescriptionRef = useRef<HTMLInputElement>(null);
  const inputSelectTheme = useRef<HTMLSelectElement>(null);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  /* add group function handler */
  const handleAddGroup = () => {
    let color = inputSelectTheme.current?.value;
    if (!color) {
      color = 'default';
    }

    const group: ProjectWorkPropsContainer = {
      id: nanoid(12),
      color: GroupColors[color],
      title: inputGroupNameRef.current?.value || '',
      description: inputGroupDescriptionRef.current?.value || '',
      list: [],
    };

    dispatch({ type: 'add', id: group.id, group });

    closeModal();
  };

  /* handling `Enter` key during input... */
  const handleOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddGroup();
    }
  };

  return (
    <>
      <button
        title="Create a new work group"
        onClick={openModal}
        type="button"
        className="bg-indigo-300 hover:bg-indigo-400 text-white px-2 py-1 rounded-lg text-sm inline-flex items-center"
      >
        <DocumentTextIcon className="h-4 w-4 sm:mr-1" />
        <span className="hidden sm:block">new work group</span>
      </button>

      <WorkGroupModal
        open={open}
        closeModal={closeModal}
        inputGroupNameRef={inputGroupNameRef}
        inputGroupDescriptionRef={inputGroupDescriptionRef}
        nameDefValue=""
        descriptionDefValue=""
        selectThemeRef={inputSelectTheme}
        selectThemeDefValue="default"
        dialogTitle="Add a new work category"
        handleOnEnter={handleOnEnter}
      >
        <button
          type="button"
          className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
          onClick={handleAddGroup}
        >
          Create WorkGroup
        </button>
      </WorkGroupModal>
    </>
  );
}
