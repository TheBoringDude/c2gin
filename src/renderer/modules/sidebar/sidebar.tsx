import { LightBulbIcon, MenuIcon } from '@heroicons/react/outline';
import { nanoid } from 'nanoid';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useCurrentProject from '../../hooks/useCurrentProject';
import useWorkGroup from '../../hooks/useWorkGroup';
import db from '../../lib/lowdb';
import ListProject from '../projects/list-project';
import NewProjectHandler from '../projects/new-project';
import TagManager from '../tags/tag-manager';
import HomeHeader from './home-header';
import SideBarProjectsSearch from './search-sidebar';

type SideBarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SideBar = ({ open, setOpen }: SideBarProps) => {
  // get states from workgroup
  const { setSelected, projects, modified, toggleMode } = useCurrentProject();
  const { dispatch, updated } = useWorkGroup();

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
    // handleReRead();

    // re-set the project
    setListProjects(projects);
  }, [setSelected, projects, dispatch]);

  /* shortcut: for toggling sidebar */
  useHotkeys(
    'ctrl+b',
    () => {
      setOpen(!open);
    },
    [open]
  );

  // re-render sidebar if a projects is updated
  useEffect(() => {
    // needs to be updated to be re-rendered
    if (projects !== listProjects && updated) {
      setListProjects(projects);
    }
  }, [projects, listProjects, modified, updated]);

  return (
    <div
      id="sidebar"
      className={`${
        open ? 'w-1/3 lg:w-1/4' : 'w-1/12'
      } border-r fixed h-full z-40 bg-white dark:bg-warmGray-900 dark:border-gray-600`}
    >
      <section className="p-2 flex flex-col">
        <div
          className={`mx-1 mt-1 mb-3 flex items-center ${
            open ? 'justify-between' : 'justify-center'
          } text-left`}
        >
          {open && <HomeHeader />}
          <div
            className={`inline-flex ${
              open ? 'flex-row' : 'flex-col'
            } sm:flex-row`}
          >
            <button
              id="toggle-mode"
              className="opacity-80 hover:opacity-100 p-1 border rounded-lg my-1 sm:my-0 sm:mr-1 dark:border-gray-800 text-white bg-warmGray-500 dark:bg-warmGray-600 dark:text-white"
              type="button"
              title="Toggle Dark Mode"
              onClick={() => {
                toggleMode();
              }}
            >
              <LightBulbIcon className="h-5 w-5" />
            </button>
            <button
              id="toggle-sidebar"
              className="opacity-60 hover:opacity-100 p-1 border rounded-lg my-1 sm:my-0 dark:border-gray-800 bg-white dark:bg-warmGray-600 dark:text-white"
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

        {/* buttons */}
        <div>
          <NewProjectHandler
            sideOpen={open}
            HandleCreateProject={HandleCreateProject}
            inputProjectRef={inputProjectRef}
          />

          <div
            className={`${
              open ? 'text-right mt-1' : 'text-center md:text-right'
            }`}
          >
            <TagManager sideOpen={open} />
          </div>
        </div>
      </section>

      <hr className="dark:border-gray-600" />

      <SideBarProjectsSearch
        setListProjects={setListProjects}
        open={open}
        setOpen={setOpen}
      />

      <ul className="pt-3 h-full pb-56 list-scroll">
        {listProjects.map((project, index) => (
          <ListProject key={project.id} project={project} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
