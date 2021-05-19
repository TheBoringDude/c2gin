import React from 'react';
import Container from '../components/container';
import useCurrentProject from '../hooks/useCurrentProject';

const Home = () => {
  const { selected } = useCurrentProject();

  return (
    <Container>
      <p>{JSON.stringify(selected)}</p>
    </Container>
  );
};

export default Home;
