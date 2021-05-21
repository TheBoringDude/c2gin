/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ProjectWorkCategoryProps } from '../../c2gin/lowdb';

type WorkListProps = {
  list: ProjectWorkCategoryProps;
  index: number;
};

export default function WorkList({ list, index }: WorkListProps) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="m-1 p-1 rounded-md border truncate"
        >
          {list.title}
        </li>
      )}
    </Draggable>
  );
}
