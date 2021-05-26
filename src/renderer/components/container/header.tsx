import React from 'react';

import HeaderSaveButton from './header-save';
import useCurrentProject from '../../hooks/useCurrentProject';
import NewWorkGroupHandler from '../modals/new-work-group';
import RemoveProjectModal from '../modals/remove-project';

type ContainerHeaderProps = {
  open: boolean;
};

const ContainerHeader = ({ open }: ContainerHeaderProps) => {
  const { selected } = useCurrentProject();

  return (
    <div
      className={`bg-white fixed z-40 ${open ? 'w-2/3 lg:w-3/4' : 'w-11/12'}`}
    >
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-indigo-600 tracking-wider">
          {selected.name}
        </h2>
        <div className="flex">
          <NewWorkGroupHandler />
          <HeaderSaveButton id={selected.id} />
          <RemoveProjectModal />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ContainerHeader;
