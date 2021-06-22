import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import ProjectAsterisk from '../../components/asterisk';
import useCurrentProject from '../../hooks/useCurrentProject';
import useFindProjectId from '../../hooks/useDB';
import useProjectTags from '../../hooks/useTags';
import useWorkGroup from '../../hooks/useWorkGroup';
import { ProjectPropsSchema } from '../../lib/lowdb';
import { handleProjectSave } from '../../lib/queries';

type ListProjectProps = {
  project: ProjectPropsSchema;
  index: number;
};

const ListProject = ({ project, index }: ListProjectProps) => {
  const { selected, setSelected } = useCurrentProject();
  const { dispatch, state, updated, setUpdated } = useWorkGroup();
  const projectTags = useProjectTags(project.id);

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
    <li
      key={project.id}
      className={`group relative flex items-center justify-between hover:bg-indigo-200 dark:hover:bg-indigo-400 border-b dark:border-gray-800 ${
        selected?.id === project.id &&
        'bg-indigo-200 dark:bg-indigo-400 dark:text-white'
      }`}
    >
      <ul className="absolute top-1 right-1 text-xs inline-flex">
        {projectTags.map(({ name }) => (
          <li key={name} className="px-2 border-gray-800 border rounded-full">
            {name}
          </li>
        ))}
      </ul>
      <button
        onClick={handleClick}
        title={`Select '${project.name}'`}
        type="button"
        className="p-3 tracking-wider truncate text-left w-full dark:text-gray-100 focus:outline-none"
      >
        <span>
          <ProjectAsterisk projectid={project.id} />
          {project.name}
        </span>
      </button>
    </li>
  );
};

export default ListProject;
