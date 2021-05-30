import React from 'react';

import HeaderSaveButton from './header-save';
import useCurrentProject from '../../hooks/useCurrentProject';
import NewWorkGroupHandler from '../modals/new-work-group';
import RemoveProjectModal from '../modals/remove-project';
import useWorkGroup from '../../hooks/useWorkGroup';

type ContainerHeaderProps = {
  open: boolean;
};

const ContainerHeader = ({ open }: ContainerHeaderProps) => {
  const { selected } = useCurrentProject();
  const { updated, state } = useWorkGroup();

  return (
    <div
      className={`bg-white fixed z-40 ${open ? 'w-2/3 lg:w-3/4' : 'w-11/12'}`}
    >
      <div className="p-4 flex items-center justify-between">
        <h2
          className="text-xl font-bold text-indigo-600 tracking-wider w-1/2 truncate"
          title={selected.name}
        >
          {/* show asterisk if updated and if selected != state */}
          {updated && selected.works !== state && '*'} {selected.name}
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
