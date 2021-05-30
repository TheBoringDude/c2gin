import React, { useRef, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/solid';
import { nanoid } from 'nanoid';

import { ProjectWorkPropsContainer } from '../../c2gin/lowdb';
import useWorkGroup from '../../hooks/useWorkGroup';
import WorkList from './list-group-work';
import RenameWorkGroupHandlerProps from '../modals/rename-work-group';
import RemoveWorkGroup from '../modals/remove-work-group';

type ListGroupProps = {
  groupid: string;
  works: ProjectWorkPropsContainer;
  idx: number;
};
const ListGroup = ({ groupid, works, idx }: ListGroupProps) => {
  const [open, setOpen] = useState(false);

  const { dispatch } = useWorkGroup();

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
    // setOpen(false);
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
          className={`w-full border rounded-lg ${works.color?.border}`}
        >
          <div
            className={`py-2 rounded-t-lg px-4 flex items-center justify-between ${works.color?.bg} border ${works.color.border}`}
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

          <hr />

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
                  className="py-1 px-2 w-full border rounded-md"
                />
                <button type="button" onClick={handleWorkAddList}>
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </section>
          )}

          <Droppable droppableId={groupid} type="group">
            {(provided) => (
              <ul ref={provided.innerRef}>
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
        </li>
      )}
    </Draggable>
  );
};

export default ListGroup;
