import React from 'react';
import ProjectAsterisk from '../../components/asterisk';
import useCurrentProject from '../../hooks/useCurrentProject';
import useSideBar from '../../hooks/useSideBar';
import useProjectTags from '../../hooks/useTags';
import NewWorkGroupHandler from '../group/new-group';
import EditProject from '../projects/edit-project';
import RemoveProjectModal from '../projects/remove-project';
import HeaderSaveButton from '../projects/save-project';

const ContainerHeader = () => {
  const { selected } = useCurrentProject();
  const { sideOpen } = useSideBar();
  const projectTags = useProjectTags(selected.id);

  return (
    <div
      className={`bg-white dark:bg-warmGray-900 fixed z-40 ${
        sideOpen ? 'w-2/3 lg:w-3/4' : 'w-11/12'
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="w-1/2 flex flex-col">
          <div className="inline-flex">
            <h2
              className="text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-wider truncate"
              title={selected.name}
            >
              <ProjectAsterisk projectid={selected.id} />
              {selected.name}
            </h2>
            <EditProject />
          </div>
          <ul className="inline-flex mt-2">
            {projectTags.length > 0 ? (
              projectTags.map(({ name }) => (
                <li
                  key={name}
                  className="truncate text-sm rounded-full px-2 mr-1 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                >
                  {name}
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-400 dark:text-gray-500">
                (no tags)
              </p>
            )}
          </ul>
        </div>

        <div className="flex">
          <NewWorkGroupHandler />
          <HeaderSaveButton id={selected.id} />
          <RemoveProjectModal />
        </div>
      </div>
      <hr className="dark:border-gray-700" />
    </div>
  );
};

export default ContainerHeader;
