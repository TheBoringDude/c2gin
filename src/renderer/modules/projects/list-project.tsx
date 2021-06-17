import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { ProjectPropsSchema } from '../../lib/lowdb';
import { handleProjectSave } from '../../lib/queries';
import useCurrentProject from '../../hooks/useCurrentProject';
import useFindProjectId from '../../hooks/useDB';
import useWorkGroup from '../../hooks/useWorkGroup';
import ProjectAsterisk from '../../components/asterisk';

type ListProjectProps = {
  project: ProjectPropsSchema;
  index: number;
};

const ListProject = ({ project, index }: ListProjectProps) => {
  const { selected, setSelected } = useCurrentProject();
  const { dispatch, state, updated, setUpdated } = useWorkGroup();

  /* project selection */
  const HandleSelectProject = (id: string) => {
    const p = useFindProjectId(id);
    if (!p) return;

    const q = p.works;

    dispatch({ type: 'set', work: q });
    setSelected(id);
  };

  const handleClick = () => {
    // save only if updated and if id exists
    if (selected?.id && updated) {
      handleProjectSave(selected?.id, state);
    }

    HandleSelectProject(project?.id);

    // make sure to make updated -> false
    setUpdated(false);
  };

  /* shortcut for selecting a project in sidebar */
  useHotkeys(
    `alt+${index + 1}`,
    () => {
      handleClick();
    },
    [updated]
  );

  return (
    <li key={project.id}>
      <button
        onClick={handleClick}
        title={`Select '${project.name}'`}
        type="button"
        className={`tracking-wider truncate p-3 border-b dark:border-gray-800 text-left w-full hover:bg-indigo-200 dark:hover:bg-indigo-400 dark:text-gray-100 ${
          selected?.id === project.id &&
          'bg-indigo-200 dark:bg-indigo-400 dark:text-white'
        }`}
      >
        <ProjectAsterisk projectid={project.id} />
        {project.name}
      </button>
    </li>
  );
};

export default ListProject;
