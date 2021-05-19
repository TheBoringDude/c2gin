import React from 'react';
import Container from '../components/container';
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

  if (!selected?.id) return <HomeWelcome />;

  return (
    <Container>
      <p className="">{JSON.stringify(selected)}</p>
    </Container>
  );
};

export default Home;
