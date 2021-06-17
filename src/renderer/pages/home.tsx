import React from 'react';
import WorkProvider from '../c2gin/work-provider';
import Container from '../modules/container/container';

import useCurrentProject from '../hooks/useCurrentProject';

const Home = () => {
  const { selected } = useCurrentProject();

  return (
    <WorkProvider initialState={selected?.works || {}}>
      <Container />
    </WorkProvider>
  );
};

export default Home;
