import React, { useState } from 'react';

import SideBar from './sidebar';
import ContainerBody from './container/body';
import ContainerHeader from './container/header';
import useCurrentProject from '../hooks/useCurrentProject';

const Container = () => {
  const { selected } = useCurrentProject();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <SideBar open={open} setOpen={setOpen} />

      <div
        className={`${open ? 'w-2/3 lg:w-3/4' : 'w-11/12'} ml-auto h-screen`}
      >
        {selected?.id && selected?.id !== '' ? (
          <>
            <ContainerHeader open={open} />

            <ContainerBody />
          </>
        ) : (
          <div className="p-8 text-center">
            <h3 className="text-4xl font-bold text-gray-600">Welcome back!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
