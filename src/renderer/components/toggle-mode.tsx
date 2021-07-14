import { LightBulbIcon } from '@heroicons/react/solid';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useMode from '../hooks/useMode';

const ToggleMode = () => {
  const { toggleMode, mode } = useMode();

  /* shortcut: for toggling the dark and light mode */
  useHotkeys(
    'ctrl+k',
    () => {
      toggleMode();
    },
    [mode]
  );

  return (
    <button
      id="toggle-mode"
      className="opacity-80 hover:opacity-100 p-1.5 border rounded-lg my-1 sm:my-0 dark:border-gray-800 bg-warmGray-200 dark:bg-warmGray-600 text-warmGray-600 dark:text-white"
      type="button"
      title={`Toggle ${mode === 'light' ? 'Dark' : 'Light'} Mode`}
      onClick={() => {
        toggleMode();
      }}
    >
      <LightBulbIcon className="h-4 w-4" />
    </button>
  );
};

export default ToggleMode;
