import React, { useEffect, useReducer } from 'react';
import db from '../c2gin/lowdb';
import Container from '../components/container';
import ContainerBody from '../components/container/body';
import ContainerHeader from '../components/container/header';
import useCurrentProject from '../hooks/useCurrentProject';
import GroupReducer from '../reducers/workgroups';

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

  const [state, dispatch] = useReducer(GroupReducer, {});

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
  }, [selected]);

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

      <ContainerBody selected={selected} state={state} />
    </Container>
  );
};

export default Home;
