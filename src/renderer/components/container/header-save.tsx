import React, { useRef } from 'react';
import { handleProjectSave } from '../../c2gin/queries';
import useWorkGroup from '../../hooks/useWorkGroup';

type HeaderSaveButtonProps = {
  id: string;
};

export default function HeaderSaveButton({ id }: HeaderSaveButtonProps) {
  const { state } = useWorkGroup();

  const btnSaveRef = useRef<HTMLButtonElement>(null);
  const handleSaveWrapper = () => {
    if (!btnSaveRef.current) {
      return;
    }

    btnSaveRef.current.innerHTML = 'saving...';
    btnSaveRef.current.disabled = true;

    // NOTE: having issues using `.assign` or `.update`
    handleProjectSave(id, state);

    btnSaveRef.current.disabled = false;
    btnSaveRef.current.innerHTML = 'save';
  };

  return (
    <button
      ref={btnSaveRef}
      type="button"
      className="mx-2 border p-1 text-sm rounded-lg"
      onClick={handleSaveWrapper}
    >
      save
    </button>
  );
}
