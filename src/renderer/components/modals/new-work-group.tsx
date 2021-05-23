import React, { useRef, useState } from 'react';
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
  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className="bg-indigo-300 hover:bg-indigo-400 text-white px-2 py-1 rounded-lg text-sm"
      >
        new work group
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
