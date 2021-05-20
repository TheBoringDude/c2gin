import React, { Dispatch, useRef, useState } from 'react';
import { PlusCircleIcon, PlusIcon } from '@heroicons/react/solid';
import { nanoid } from 'nanoid';

import { ProjectWorkPropsContainer } from '../../c2gin/lowdb';
import { ActionsGroup } from '../../reducers/workgroups';

type ListGroupProps = {
  dispatch: Dispatch<ActionsGroup>;
  groupid: string;
  works: ProjectWorkPropsContainer;
};
const ListGroup = ({ groupid, works, dispatch }: ListGroupProps) => {
  const [open, setOpen] = useState(false);
  // const dispatch = useWorkGroupDispatch()[1];

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
          className="text-lg font-bold tracking-wide"
          title={works.description}
        >
          {works.title}
        </h4>
        <button type="button" onClick={() => setOpen(!open)}>
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

      <ul>
        {works.list.length < 1 ? (
          <br />
        ) : (
          works.list.map((list) => <li key={list.id}>{list.title}</li>)
        )}
      </ul>
    </li>
  );
};

export default ListGroup;
