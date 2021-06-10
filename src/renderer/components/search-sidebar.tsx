import React, { Dispatch, SetStateAction, useRef } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import useCurrentProject from '../hooks/useCurrentProject';
import { ProjectPropsSchema } from '../c2gin/lowdb';

type SideBarProjectsSearchProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setListProjects: Dispatch<SetStateAction<ProjectPropsSchema[]>>;
};

export default function SideBarProjectsSearch({
  open,
  setOpen,
  setListProjects,
}: SideBarProjectsSearchProps) {
  const { projects } = useCurrentProject();

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

  return (
    <div className="m-1 flex items-center justify-center bg-gray-50 dark:bg-warmGray-800">
      {open && (
        <input
          ref={inputFindRef}
          type="text"
          placeholder="find project..."
          onChange={HandleFind}
          className="mr-1 py-1 px-2 rounded-md border border-indigo-300 dark:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none focus:border-indigo-500 text-sm w-full dark:bg-warmGray-700 dark:text-white"
        />
      )}
      <button
        type="button"
        title="Search Project"
        onClick={() => {
          setOpen(true); // expand first the sidebar
          HandleFind();
        }}
        className="bg-indigo-400 hover:bg-indigo-500 text-white p-1 my-1 rounded-md"
      >
        <SearchIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
