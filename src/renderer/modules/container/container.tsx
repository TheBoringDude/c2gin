import React, { useState } from 'react';

import SideBar from '../sidebar/sidebar';
import ContainerBody from './body';
import ContainerHeader from './header';
import useCurrentProject from '../../hooks/useCurrentProject';
import WelcomeMessage from '../../components/welcome';

const Container = () => {
  const { selected } = useCurrentProject();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <SideBar open={open} setOpen={setOpen} />

      <div className={`${open ? 'w-2/3 lg:w-3/4' : 'w-11/12'} ml-auto`}>
        {selected?.id && selected?.id !== '' ? (
          <>
            <ContainerHeader open={open} />

            <ContainerBody />
          </>
        ) : (
          <WelcomeMessage />
        )}
      </div>
    </div>
  );
};

export default Container;
