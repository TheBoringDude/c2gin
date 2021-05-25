import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import useCurrentProject from '../../hooks/useCurrentProject';

import useWorkGroup from '../../hooks/useWorkGroup';
import ListGroup from './list-group';

const ContainerBody = () => {
  const { state, dispatch } = useWorkGroup();
  const { selected } = useCurrentProject();

  const onDragEnd = (result: DropResult) => {
    const { destination: dest, source: src } = result;

    if (!dest) return;
    if (dest.droppableId === src.droppableId && dest.index === src.index)
      return;

    if (result.type === 'group') {
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
      return;
    }

    dispatch({
      type: 'drag-group',
      sourceIdx: src.index,
      destIdx: dest.index,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="py-8 px-3 pt-20 z-30 absolute">
        <Droppable
          droppableId={selected.id}
          type="container"
          direction="horizontal"
        >
          {(provided) => (
            <ul
              ref={provided.innerRef}
              className=" h-screen flex whitespace-nowrap"
            >
              {Object.entries(state).map(([key, value], index) => (
                <div key={key} className="w-96 mx-1">
                  <ListGroup
                    groupid={key}
                    works={value}
                    key={key}
                    idx={index}
                  />
                </div>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default ContainerBody;
