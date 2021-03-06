/* eslint-disable react/jsx-props-no-spreading */

import { CheckCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import useGroup from '../../hooks/useGroup';
import { ProjectGroupListProps } from '../../lib/lowdb';

type WorkListProps = {
  list: ProjectGroupListProps;
  index: number;
  groupid: string;
};

export default function WorkList({ groupid, list, index }: WorkListProps) {
  const [edit, setEdit] = useState(false);

  const { dispatch, state } = useGroup();
  const moveid = state[groupid].moveTo || '';

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

  // for moving items
  const handleMoveItem = () => {
    if (!moveid) return;
    if (!state[moveid]) return;

    dispatch({
      type: 'handle-drag',
      source: {
        id: groupid,
        index,
      },
      destination: {
        id: moveid,
        index: state[moveid].list.length,
      },
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
            className="mx-1 my-2 flex items-center justify-between"
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
              className="py-1 px-2 w-full border rounded-md bg-white dark:bg-warmGray-700 dark:text-gray-200"
            />
            <button
              type="button"
              onClick={handleWorkEditList}
              className="dark:text-gray-200"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </li>
        ) : (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="m-1 py-1 px-2 group bg-white hover:bg-gray-100 dark:hover:bg-warmGray-600 rounded-md border border-gray-300 dark:border-gray-700 flex items-center justify-between dark:bg-warmGray-700"
          >
            <p
              className="truncate text-gray-800 dark:text-gray-200"
              onDoubleClick={() => {
                // if the item is double-clicked, it will trigger the rename
                setEdit(true);
              }}
            >
              {list.title}
            </p>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              {state[moveid] && (
                <button
                  title="Mark as done"
                  type="button"
                  className="hover:text-green-500"
                  onClick={handleMoveItem}
                >
                  <CheckCircleIcon className="h-4 w-4 hidden group-hover:block" />
                </button>
              )}
              <button
                title={`Rename '${list.title}'`}
                type="button"
                className="mx-1 hover:text-blue-500"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <PencilIcon className="h-4 w-4 hidden group-hover:block" />
              </button>
              <button
                title={`Remove '${list.title}'`}
                type="button"
                className="hover:text-red-500"
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
