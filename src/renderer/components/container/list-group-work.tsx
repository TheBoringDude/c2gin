/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Draggable } from 'react-beautiful-dnd';
import { ProjectWorkListProps } from '../../c2gin/lowdb';
import useWorkGroup from '../../hooks/useWorkGroup';

type WorkListProps = {
  list: ProjectWorkListProps;
  index: number;
  groupid: string;
};

export default function WorkList({ groupid, list, index }: WorkListProps) {
  const [edit, setEdit] = useState(false);

  const { dispatch } = useWorkGroup();

  const inputEditWorkName = useRef<HTMLInputElement>(null);

  // for editing a list
  const handleWorkEditList = () => {
    const newTitle = inputEditWorkName.current?.value;
    if (!newTitle) return;

    dispatch({
      type: 'rename-list',
      id: groupid,
      list: {
        id: list.id,
        title: newTitle,
      },
      index,
    });

    setEdit(false);
  };

  // for removing a list
  const handleWorkRemoveList = (i: number) => {
    dispatch({
      type: 'remove-list',
      id: groupid,
      index: i,
    });
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) =>
        edit ? (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="mx-1 my-2 flex items-center justify-between bg-white"
          >
            <input
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleWorkEditList();
                }
              }}
              onBlur={() => {
                setEdit(false);
              }}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              ref={inputEditWorkName}
              type="text"
              placeholder="what to work?"
              defaultValue={list.title}
              className="py-1 px-2 w-full border rounded-md"
            />
            <button type="button" onClick={handleWorkEditList}>
              <PencilIcon className="h-4 w-4" />
            </button>
          </li>
        ) : (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="m-1 p-1 group rounded-md border border-gray-300 flex items-center justify-between bg-white"
          >
            <p className="truncate text-gray-800">{list.title}</p>
            <div className="flex items-center">
              <button
                type="button"
                className=""
                onClick={() => {
                  setEdit(true);
                }}
              >
                <PencilIcon className="h-4 w-4 hidden group-hover:block" />
              </button>
              <button
                type="button"
                className="ml-1"
                onClick={() => handleWorkRemoveList(index)}
              >
                <TrashIcon className="h-4 w-4 hidden group-hover:block" />
              </button>
            </div>
          </li>
        )
      }
    </Draggable>
  );
}
