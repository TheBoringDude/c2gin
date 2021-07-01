import React from 'react';
import WorkProvider from '../c2gin/group-provider';
import SideContextProvider from '../c2gin/side-provider';
import useCurrentProject from '../hooks/useCurrentProject';
import Container from '../modules/container/container';
import SideBar from '../modules/sidebar/sidebar';

const Home = () => {
  const { selected } = useCurrentProject();

  return (
    <WorkProvider initialState={selected?.works || {}}>
      <SideContextProvider>
        <SideBar />
        <Container />
      </SideContextProvider>
    </WorkProvider>
  );
};

export default Home;
