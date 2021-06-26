import { LightBulbIcon, MenuIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useCurrentProject from '../../hooks/useCurrentProject';
import useSideBar from '../../hooks/useSideBar';
import useWorkGroup from '../../hooks/useWorkGroup';
import ListProject from '../projects/list-project';
import NewProjectHandler from '../projects/new-project';
import TagManager from '../tags/tag-manager';
import HomeHeader from './home-header';
import SideBarProjectsSearch from './search-sidebar';

const SideBar = () => {
  // get states from workgroup
  const { projects, modified, toggleMode } = useCurrentProject();
  const { updated } = useWorkGroup();
  const { sideOpen, setSideOpen } = useSideBar();

  // create a clone of projects
  const [listProjects, setListProjects] = useState(Array.from(projects));

  /* shortcut: for toggling sidebar */
  useHotkeys(
    'ctrl+b',
    () => {
      setSideOpen(!sideOpen);
    },
    [sideOpen]
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
        sideOpen ? 'w-1/3 lg:w-1/4' : 'w-1/12'
      } border-r fixed h-full z-40 bg-white dark:bg-warmGray-900 dark:border-gray-600`}
    >
      <section className="p-2 flex flex-col">
        <div
          className={`mx-1 mt-1 mb-3 flex items-center ${
            sideOpen ? 'justify-between' : 'justify-center'
          } text-left`}
        >
          {sideOpen && <HomeHeader />}
          <div
            className={`inline-flex ${
              sideOpen ? 'flex-row' : 'flex-col'
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
                setSideOpen(!sideOpen);
              }}
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* buttons */}
        <div>
          <NewProjectHandler />

          <div
            className={`${
              sideOpen ? 'text-right mt-1' : 'text-center md:text-right'
            }`}
          >
            <TagManager />
          </div>
        </div>
      </section>

      <hr className="dark:border-gray-600" />

      <SideBarProjectsSearch setListProjects={setListProjects} />

      <ul className="pt-3 h-full pb-56 list-scroll">
        {listProjects.map((project, index) => (
          <ListProject key={project.id} project={project} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
