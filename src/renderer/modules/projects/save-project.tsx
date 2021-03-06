import { SaveIcon } from '@heroicons/react/outline';
import React, { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useGroup from '../../hooks/useGroup';
import { handleProjectSave } from '../../lib/queries';

type HeaderSaveButtonProps = {
  id: string;
};

export default function HeaderSaveButton({ id }: HeaderSaveButtonProps) {
  const [text, setText] = useState('save');

  const { state, setUpdated, updated } = useGroup();

  const btnSaveRef = useRef<HTMLButtonElement>(null);
  const handleSaveWrapper = () => {
    if (!updated) return;

    if (!btnSaveRef.current) return;

    btnSaveRef.current.disabled = true;

    // NOTE: having issues using `.assign` or `.update`
    handleProjectSave(id, state);

    setText('saved');

    // update
    setUpdated(false);

    setTimeout(() => {
      if (!btnSaveRef.current) {
        return;
      }

      setText('save');
      btnSaveRef.current.disabled = false;
    }, 2000);
  };

  /* shortcut: for saving the current project */
  useHotkeys(
    'ctrl+s',
    () => {
      if (updated) {
        handleSaveWrapper();
      }
    },
    [updated, state]
  );

  return (
    <button
      ref={btnSaveRef}
      type="button"
      className="mx-2 border p-1 text-sm rounded-lg inline-flex items-center opacity-60 hover:opacity-100 bg-white"
      onClick={handleSaveWrapper}
      title="Save current project work"
    >
      <SaveIcon className="h-4 w-4 sm:mr-1" />
      <span className="hidden md:block truncate">{text}</span>
    </button>
  );
}
