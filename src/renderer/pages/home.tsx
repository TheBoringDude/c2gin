import React from 'react';
import WorkProvider from '../c2gin/work-provider';
import Container from '../components/container';
import ContainerBody from '../components/container/body';
import ContainerHeader from '../components/container/header';
import useCurrentProject from '../hooks/useCurrentProject';

const HomeWelcome = () => {
  return (
    <Container>
      <div className="p-8 text-center">
        <h3 className="text-4xl font-bold text-gray-600">Welcome back!</h3>
      </div>
    </Container>
  );
};

const Home = () => {
  const { selected } = useCurrentProject();

  if (!selected?.id || selected.id === '') return <HomeWelcome />;

  return (
    <WorkProvider initialState={selected.works}>
      <Container>
        <ContainerHeader />

        <ContainerBody />
      </Container>
    </WorkProvider>
  );
};

export default Home;
