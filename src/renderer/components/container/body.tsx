import React from 'react';
import { ProjectPropsSchema, ProjectWorkProps } from '../../c2gin/lowdb';

type ContainerBodyProps = {
  selected: ProjectPropsSchema;
  state: ProjectWorkProps;
};

const ContainerBody = ({ selected, state }: ContainerBodyProps) => {
  return (
    <div className="py-8 px-3">
      <ul className="grid grid-cols-3 gap-4">
        {Object.entries(state).map(([key, value]) => (
          <li key={key} className="border rounded-lg">
            <h4
              className="py-2 px-4 text-lg font-bold tracking-wide"
              title={value.description}
            >
              {value.title}
            </h4>

            <hr />
          </li>
        ))}
      </ul>
      <br />
      <p>{JSON.stringify(selected)}</p>
    </div>
  );
};

export default ContainerBody;
