import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
import { LightBulbIcon, MenuIcon } from '@heroicons/react/outline';

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
  const {
    setSelected,
    selected,
    projects,
    handleReRead,
    toggleMode,
  } = useCurrentProject();
  const { state, dispatch, updated, setUpdated } = useWorkGroup();

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

    // set the state works
    dispatch({
      type: 'set',
      work: proj.works,
    });

    // re-read
    handleReRead();

    // re-set the project
    setListProjects(projects);
  }, [setSelected, handleReRead, projects, dispatch]);

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
      } border-r fixed h-full z-40 bg-white dark:bg-warmGray-900 dark:border-gray-600`}
    >
      <section className="py-4 px-2 flex flex-col">
        <div
          className={`mx-1 mt-1 mb-3 flex items-start ${
            open ? 'justify-between' : 'justify-center'
          } text-left`}
        >
          {open && <HomeHeader />}
          <div className="inline-flex">
            <button
              className="p-1 border rounded-lg mx-1 dark:border-gray-800 text-white bg-warmGray-500 dark:bg-warmGray-600 dark:text-white"
              type="button"
              title="Toggle Dark Mode"
              onClick={() => {
                toggleMode();
              }}
            >
              <LightBulbIcon className="h-5 w-5" />
            </button>
            <button
              className="p-1 border rounded-lg mx-1 dark:border-gray-800 bg-white dark:bg-warmGray-600 dark:text-white"
              type="button"
              title="Toggle Menu"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <NewProjectHandler
          sideOpen={open}
          HandleCreateProject={HandleCreateProject}
          inputProjectRef={inputProjectRef}
        />
      </section>

      <hr className="dark:border-gray-600" />

      <SideBarProjectsSearch
        setListProjects={setListProjects}
        open={open}
        setOpen={setOpen}
      />

      <ul className="pt-3 h-full pb-56 list-scroll">
        {listProjects.map((project) => (
          <li key={project.id}>
            <button
              onClick={() => {
                // save only if updated and if id exists
                if (selected?.id && updated) {
                  handleProjectSave(selected?.id, state);
                }
                HandleSelectProject(project?.id);

                // make sure to make updated -> false
                setUpdated(false);
              }}
              title={`Select '${project.name}'`}
              type="button"
              className={`tracking-wider truncate p-3 border-b dark:border-gray-800 text-left w-full hover:bg-indigo-200 dark:hover:bg-indigo-500 dark:text-gray-200 ${
                selected?.id === project.id &&
                'bg-indigo-200 dark:bg-indigo-500 dark:text-white'
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
