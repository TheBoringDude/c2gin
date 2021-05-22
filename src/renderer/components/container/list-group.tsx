import React, { useRef, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/solid';
import { nanoid } from 'nanoid';

import { ProjectWorkPropsContainer } from '../../c2gin/lowdb';
import useWorkGroup from '../../hooks/useWorkGroup';
import WorkList from './list-group-work';

type ListGroupProps = {
  groupid: string;
  works: ProjectWorkPropsContainer;
};
const ListGroup = ({ groupid, works }: ListGroupProps) => {
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
        ...works.list,
        {
          id: nanoid(15),
          title: v,
        },
      ],
    });

    setOpen(false);
  };

  return (
    <li className="border rounded-lg">
      <div className="py-2 px-4 flex items-center justify-between">
        <h4
          className="text-lg font-bold tracking-wide truncate"
          title={works.description}
        >
          {works.title}
        </h4>
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <PlusCircleIcon className="h-5 w-5" />
        </button>
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

      <Droppable droppableId={groupid}>
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
  );
};

export default ListGroup;
