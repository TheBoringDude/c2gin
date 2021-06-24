import React from 'react';
import WelcomeMessage from '../../components/welcome';
import useCurrentProject from '../../hooks/useCurrentProject';
import useSideBar from '../../hooks/useSideBar';
import ContainerBody from './body';
import ContainerHeader from './header';

const Container = () => {
  const { selected } = useCurrentProject();
  const { sideOpen } = useSideBar();

  return (
    <div className={`${sideOpen ? 'w-2/3 lg:w-3/4' : 'w-11/12'} ml-auto`}>
      {selected?.id && selected?.id !== '' ? (
        <>
          <ContainerHeader />

          <ContainerBody />
        </>
      ) : (
        <WelcomeMessage />
      )}
    </div>
  );
};

export default Container;
