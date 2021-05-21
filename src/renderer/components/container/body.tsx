import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import useCurrentProject from '../../hooks/useCurrentProject';
import useWorkGroup from '../../hooks/useWorkGroup';
import ListGroup from './list-group';

const ContainerBody = () => {
  const { selected } = useCurrentProject();
  const { state } = useWorkGroup();

  const onDragEnd = () => {};

  return (
    <div className="py-8 px-3">
      <DragDropContext onDragEnd={onDragEnd}>
        <ul className="grid grid-cols-3 gap-4">
          {Object.entries(state).map(([key, value]) => (
            <ListGroup groupid={key} works={value} key={key} />
          ))}
        </ul>
      </DragDropContext>
      <br />
      <p>{JSON.stringify(selected)}</p>
    </div>
  );
};

export default ContainerBody;
