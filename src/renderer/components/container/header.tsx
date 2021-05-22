import React from 'react';

import HeaderSaveButton from './header-save';
import useCurrentProject from '../../hooks/useCurrentProject';
import NewWorkGroupHandler from '../modals/new-work-group';

const ContainerHeader = () => {
  const { selected } = useCurrentProject();

  return (
    <>
      <div className="py-2 flex items-center justify-between">
        <h2 className="text-xl font-bold text-indigo-600 tracking-wider">
          {selected.name}
        </h2>
        <div>
          <NewWorkGroupHandler />
          <HeaderSaveButton id={selected.id} />
        </div>
      </div>
      <hr />
    </>
  );
};

export default ContainerHeader;
