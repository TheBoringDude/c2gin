import { SearchIcon } from '@heroicons/react/outline';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useCurrentProject from '../../hooks/useCurrentProject';
import useSideBar from '../../hooks/useSideBar';
import { ProjectPropsSchema } from '../../lib/lowdb';

type SideBarProjectsSearchProps = {
  setListProjects: Dispatch<SetStateAction<ProjectPropsSchema[]>>;
};

export default function SideBarProjectsSearch({
  setListProjects,
}: SideBarProjectsSearchProps) {
  const { projects } = useCurrentProject();
  const { setSideOpen } = useSideBar();

  const inputFindRef = useRef<HTMLInputElement>(null);

  /* find function */
  const HandleFind = () => {
    const text = inputFindRef.current?.value;
    if (!text || text === '') {
      // retain the original list
      setListProjects(projects);
      return;
    }

    const findProject = projects.filter((project) =>
      project.name.includes(text)
    );

    setListProjects(findProject);
  };

  /* shortcut: for toggling the search bar */
  useHotkeys('ctrl+f', () => {
    setSideOpen(true);
  });

  return (
    <div className="m-1 flex items-center justify-center bg-gray-50 dark:bg-warmGray-800">
      <input
        ref={inputFindRef}
        type="text"
        placeholder="find project..."
        onChange={HandleFind}
        className="hidden md:block mr-1 py-1 px-2 rounded-md border border-indigo-300 dark:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:border-indigo-500 text-sm w-full dark:bg-warmGray-700 dark:text-white"
      />
      <button
        type="button"
        title="Search Project"
        onClick={() => {
          setSideOpen(true); // expand first the sidebar
          HandleFind();
        }}
        className="bg-indigo-400 hover:bg-indigo-500 text-white p-1 my-1 rounded-md border"
      >
        <SearchIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
