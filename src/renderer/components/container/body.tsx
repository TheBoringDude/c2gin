import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import useCurrentProject from '../../hooks/useCurrentProject';
import useWorkGroup from '../../hooks/useWorkGroup';
import ListGroup from './list-group';

const ContainerBody = () => {
  const { selected } = useCurrentProject();
  const { state, dispatch } = useWorkGroup();

  const onDragEnd = (result: DropResult) => {
    const { destination: dest, source: src } = result;

    if (!dest) return;
    if (dest.droppableId === src.droppableId && dest.index === src.index)
      return;

    dispatch({
      type: 'handle-drag',
      source: {
        id: src.droppableId,
        index: src.index,
      },
      destination: {
        id: dest.droppableId,
        index: dest.index,
      },
    });
  };

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
