import React, { useEffect } from 'react';
import db from '../c2gin/lowdb';
import Container from '../components/container';
import ContainerBody from '../components/container/body';
import ContainerHeader from '../components/container/header';
import useCurrentProject from '../hooks/useCurrentProject';
import useWorkGroupDispatch from '../hooks/useWorkgroupDispatch';

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

  const [state, dispatch] = useWorkGroupDispatch();

  useEffect(() => {
    if (selected?.id) {
      dispatch({
        type: 'set',
        work:
          db
            .get('projects')
            .find({ id: selected?.id || '' })
            .value()?.works || {},
      });
    }
  }, [selected, dispatch]);

  /* saving the project */
  const HandleSaveProject = () => {
    // NOTE: having issues using `.assign` or `.update`
    db.get('projects').find({ id: selected?.id }).set('works', state).write();
  };

  if (!selected?.id || selected.id === '') return <HomeWelcome />;

  return (
    <Container>
      <ContainerHeader
        handleSave={HandleSaveProject}
        dispatch={dispatch}
        name={selected.name}
      />

      <ContainerBody dispatch={dispatch} selected={selected} state={state} />
    </Container>
  );
};

export default Home;
