import React from 'react';
import WorkProvider from '../c2gin/work-provider';
import useCurrentProject from '../hooks/useCurrentProject';
import Container from '../modules/container/container';

const Home = () => {
  const { selected } = useCurrentProject();

  return (
    <WorkProvider initialState={selected?.works || {}}>
      <Container />
    </WorkProvider>
  );
};

export default Home;
