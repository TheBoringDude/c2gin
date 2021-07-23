import { PencilAltIcon } from '@heroicons/react/solid';
import React, { KeyboardEvent, useRef, useState } from 'react';
import useGroup from '../../hooks/useGroup';
import GroupColors from '../../lib/colors';
import { ProjectGroupPropsContainer } from '../../lib/lowdb';
import { ActionsGroupEditProps } from '../../reducers/group';
import WorkGroupModal from './group-modal';

type RenameWorkGroupHandlerProps = {
  work: ProjectGroupPropsContainer;
};

export default function RenameWorkGroupHandler({
  work,
}: RenameWorkGroupHandlerProps) {
  const [open, setOpen] = useState(false);

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

  /* remove group function handler */
  const handleRenameGroup = () => {
    const color = inputSelectTheme.current?.value || 'default';
    const moveId = inputMoveToRef.current?.value;

    const group: ActionsGroupEditProps = {
      title: inputGroupNameRef.current?.value || '',
      description: inputGroupDescriptionRef.current?.value || '',
      color: GroupColors[color].key,
      moveTo: moveId,
    };

    dispatch({ type: 'edit', id: work.id, new: group });

    closeModal();
  };

  /* handling `Enter` key during input... */
  const handleOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRenameGroup();
    }
  };

  return (
    <>
      <button type="button" onClick={openModal} title="Rename group">
        <PencilAltIcon className="h-5 w-5 ml-1" />
      </button>

      <WorkGroupModal
        open={open}
        groupId={work.id}
        closeModal={closeModal}
        inputGroupNameRef={inputGroupNameRef}
        inputGroupDescriptionRef={inputGroupDescriptionRef}
        nameDefValue={work.title}
        descriptionDefValue={work.description}
        selectThemeRef={inputSelectTheme}
        selectThemeDefValue={work.color || 'default'}
        dialogTitle="Rename Group"
        handleOnEnter={handleOnEnter}
        moveToRef={inputMoveToRef}
        moveToDefValue={work.moveTo || ''}
      >
        <button
          type="button"
          className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
          onClick={handleRenameGroup}
        >
          Rename Group
        </button>
      </WorkGroupModal>
    </>
  );
}
