import React from 'react';
import ProjectAsterisk from '../../components/asterisk';
import useCurrentProject from '../../hooks/useCurrentProject';
import NewWorkGroupHandler from '../group/new-group';
import EditProject from '../projects/edit-project';
import RemoveProjectModal from '../projects/remove-project';
import HeaderSaveButton from '../projects/save-project';

type ContainerHeaderProps = {
  open: boolean;
};

const ContainerHeader = ({ open }: ContainerHeaderProps) => {
  const { selected } = useCurrentProject();

  return (
    <div
      className={`bg-white dark:bg-warmGray-900 fixed z-40 ${
        open ? 'w-2/3 lg:w-3/4' : 'w-11/12'
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="inline-flex w-1/2">
          <h2
            className="text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-wider truncate"
            title={selected.name}
          >
            <ProjectAsterisk projectid={selected.id} />
            {selected.name}
          </h2>
          <EditProject />
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
