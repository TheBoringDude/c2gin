import React, { Dispatch } from 'react';

import { ProjectPropsSchema, ProjectWorkProps } from '../../c2gin/lowdb';
import { ActionsGroup } from '../../reducers/workgroups';
import ListGroup from './list-group';

type ContainerBodyProps = {
  dispatch: Dispatch<ActionsGroup>;
  selected: ProjectPropsSchema;
  state: ProjectWorkProps;
};

const ContainerBody = ({ selected, state, dispatch }: ContainerBodyProps) => {
  return (
    <div className="py-8 px-3">
      <ul className="grid grid-cols-3 gap-4">
        {Object.entries(state).map(([key, value]) => (
          <ListGroup
            dispatch={dispatch}
            groupid={key}
            works={value}
            key={key}
          />
        ))}
      </ul>
      <br />
      <p>{JSON.stringify(selected)}</p>
    </div>
  );
};

export default ContainerBody;
