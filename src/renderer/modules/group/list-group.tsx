import { PlusCircleIcon, PlusIcon } from '@heroicons/react/solid';
import { nanoid } from 'nanoid';
import React, { useRef, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import useGroup from '../../hooks/useGroup';
import GroupColors from '../../lib/colors';
import { ProjectGroupPropsContainer } from '../../lib/lowdb';
import WorkList from '../item/list-items';
import RemoveWorkGroup from './remove-group';
import RenameWorkGroupHandlerProps from './rename-group';

type ListGroupProps = {
  groupid: string;
  works: ProjectGroupPropsContainer;
  idx: number;
};

const ListGroup = ({ groupid, works, idx }: ListGroupProps) => {
  const [open, setOpen] = useState(false);

  const { dispatch } = useGroup();

  const inputWorkName = useRef<HTMLInputElement>(null);

  const handleWorkAddList = () => {
    const v = inputWorkName.current?.value;
    if (!v) return;

    dispatch({
      type: 'add-list',
      id: groupid,
      list: [
        ...works?.list,
        {
          id: nanoid(15),
          title: v,
        },
      ],
    });

    // remove the current value, but do not close
    if (inputWorkName.current) {
      inputWorkName.current.value = '';
    }
  };

  return (
    <Draggable draggableId={works.id} index={idx}>
      {(groupProvided) => (
        <li
          ref={groupProvided.innerRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...groupProvided.draggableProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...groupProvided.dragHandleProps}
          className="w-full"
        >
          <div
            className={`py-2 rounded-t-lg px-4 flex items-center justify-between border ${
              GroupColors[works.color].bg
            }`}
          >
            <h4
              className="font-bold tracking-wide truncate"
              title={works.description}
            >
              {works.title}
            </h4>
            <div className="flex">
              <button
                title="Add a new work / todo"
                type="button"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <PlusCircleIcon className="h-5 w-5" />
              </button>
              <RenameWorkGroupHandlerProps work={works} />
              <RemoveWorkGroup groupid={works.id} />
            </div>
          </div>

          <hr className={`${GroupColors[works.color].border}`} />

          <div
            className={`border rounded-b-lg bg-white dark:bg-warmGray-900 ${
              GroupColors[works.color].border
            } dark:border-gray-700`}
          >
            {/* add new item input */}
            {open && (
              <section>
                <div className="m-1 flex items-center justify-between">
                  <input
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleWorkAddList();
                      }
                    }}
                    onBlur={() => {
                      setOpen(false);
                    }}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    ref={inputWorkName}
                    type="text"
                    placeholder="what to work?"
                    className="py-1 px-2 w-full border rounded-md dark:bg-warmGray-700 dark:text-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handleWorkAddList}
                    className="text-gray-700 dark:text-gray-200"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </section>
            )}

            {/* list items */}
            <Droppable droppableId={groupid} type="group">
              {(provided) => (
                <ul className="h-128 overflow-y-auto" ref={provided.innerRef}>
                  {works.list.length < 1 ? (
                    <br />
                  ) : (
                    works.list.map((list) => (
                      <WorkList
                        key={list.id}
                        list={list}
                        groupid={groupid}
                        index={works.list.indexOf(list)}
                      />
                    ))
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListGroup;
