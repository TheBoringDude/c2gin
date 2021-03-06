import { DocumentTextIcon } from '@heroicons/react/outline';
import { nanoid } from 'nanoid';
import React, { KeyboardEvent, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useCurrentProject from '../../hooks/useCurrentProject';
import useGroup from '../../hooks/useGroup';
import GroupColors from '../../lib/colors';
import { ProjectGroupPropsContainer } from '../../lib/lowdb';
import WorkGroupModal from './group-modal';

export default function NewWorkGroupHandler() {
  const [open, setOpen] = useState(false);

  const { selected } = useCurrentProject();
  const { dispatch } = useGroup();

  const inputGroupNameRef = useRef<HTMLInputElement>(null);
  const inputGroupDescriptionRef = useRef<HTMLInputElement>(null);
  const inputSelectTheme = useRef<HTMLSelectElement>(null);
  const inputMoveToRef = useRef<HTMLSelectElement>(null);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  /* add group function handler */
  const handleAddGroup = () => {
    const color = inputSelectTheme.current?.value || 'default';
    const moveTo = inputMoveToRef.current?.value || '';

    const group: ProjectGroupPropsContainer = {
      id: nanoid(12),
      color: GroupColors[color].key,
      title: inputGroupNameRef.current?.value || '',
      description: inputGroupDescriptionRef.current?.value || '',
      list: [],
      moveTo,
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

  /* shortcut: for creating a new work group */
  useHotkeys('ctrl+alt+p', () => {
    if (selected) {
      openModal();
    }
  });

  return (
    <>
      <button
        title="Create a new group"
        onClick={openModal}
        type="button"
        className="bg-indigo-300 hover:bg-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-2 py-1 rounded-lg text-sm inline-flex items-center"
      >
        <DocumentTextIcon className="h-4 w-4 sm:mr-1" />
        <span className="hidden md:block truncate">new group</span>
      </button>

      <WorkGroupModal
        open={open}
        groupId={null}
        closeModal={closeModal}
        inputGroupNameRef={inputGroupNameRef}
        inputGroupDescriptionRef={inputGroupDescriptionRef}
        nameDefValue=""
        descriptionDefValue=""
        selectThemeRef={inputSelectTheme}
        selectThemeDefValue="default"
        dialogTitle="Add a New Group"
        handleOnEnter={handleOnEnter}
        moveToRef={inputMoveToRef}
        moveToDefValue=""
      >
        <button
          type="button"
          className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
          onClick={handleAddGroup}
        >
          Create Group
        </button>
      </WorkGroupModal>
    </>
  );
}
