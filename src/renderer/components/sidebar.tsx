import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
import { MenuIcon } from '@heroicons/react/outline';

import HomeHeader from './home-header';
import NewProjectHandler from './new-project';

import db from '../c2gin/lowdb';
import useCurrentProject from '../hooks/useCurrentProject';
import useWorkGroup from '../hooks/useWorkGroup';
import useFindProjectId from '../hooks/useDB';
import { handleProjectSave } from '../c2gin/queries';
import SideBarProjectsSearch from './search-sidebar';

type SideBarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SideBar = ({ open, setOpen }: SideBarProps) => {
  const { setSelected, selected, projects, handleReRead } = useCurrentProject();
  const { state, dispatch } = useWorkGroup();

  // create a clone of projects
  const [listProjects, setListProjects] = useState(Array.from(projects));

  const inputProjectRef = useRef<HTMLInputElement>(null);

  /* project creation */
  const HandleCreateProject = useCallback(() => {
    const projectName = inputProjectRef.current?.value || '';

    if (!projectName) return;

    const proj = {
      id: nanoid(12),
      name: projectName,
      createdDate: new Date().toISOString(),
      works: {},
    };

    db.get('projects').push(proj).write();

    setSelected(proj.id);
    handleReRead();
  }, [setSelected, handleReRead]);

  /* project selection */
  const HandleSelectProject = (id: string) => {
    const q = useFindProjectId(id).works;

    dispatch({ type: 'set', work: q });
    setSelected(id);
  };

  return (
    <div
      className={`${
        open ? 'w-1/3 lg:w-1/4' : 'w-1/12'
      } border-r fixed h-full z-40 bg-white`}
    >
      <div className="text-center m-1">
        <button
          className={`p-1 border rounded-lg ${
            open && 'absolute top-1 right-1'
          }`}
          type="button"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>

      <section className={`${open ? 'p-4' : 'p-2'} flex flex-col`}>
        {open && <HomeHeader />}

        <NewProjectHandler
          sideOpen={open}
          HandleCreateProject={HandleCreateProject}
          inputProjectRef={inputProjectRef}
        />
      </section>

      <hr />

      <SideBarProjectsSearch
        setListProjects={setListProjects}
        open={open}
        setOpen={setOpen}
      />

      <ul className="pt-3 overflow-y-auto h-full pb-40">
        {listProjects.map((project) => (
          <li key={project.id}>
            <button
              onClick={() => {
                if (selected?.id) {
                  handleProjectSave(selected?.id, state);
                }
                HandleSelectProject(project?.id);
              }}
              type="button"
              className={`truncate p-3 border-b text-left w-full hover:bg-indigo-200 ${
                selected?.id === project.id && 'bg-indigo-200'
              }`}
            >
              {project.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
