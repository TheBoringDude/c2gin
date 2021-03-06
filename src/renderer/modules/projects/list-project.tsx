import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import ProjectAsterisk from '../../components/asterisk';
import UnsavedChangesModal from '../../components/unsaved-changes';
import useCurrentProject from '../../hooks/useCurrentProject';
import useFindProjectId from '../../hooks/useDB';
import useGroup from '../../hooks/useGroup';
import useSideBar from '../../hooks/useSideBar';
import useProjectTags from '../../hooks/useTags';
import { ProjectPropsSchema } from '../../lib/lowdb';

type ListProjectProps = {
  project: ProjectPropsSchema;
  index: number;
};

const ListProject = ({ project, index }: ListProjectProps) => {
  const [openUnsaved, setOpenUnsaved] = useState(false);
  const { selected, setSelected } = useCurrentProject();
  const { dispatch, updated, setUpdated } = useGroup();
  const { sideOpen } = useSideBar();
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
    // open unsaved modal
    if (selected?.id && updated) {
      setOpenUnsaved(true);
      return;
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
    <>
      <UnsavedChangesModal
        f={() => {
          HandleSelectProject(project?.id);
          setUpdated(false);
        }}
        open={openUnsaved}
        onClose={() => {
          setOpenUnsaved(false);
        }}
      />

      <li
        key={project.id}
        className={`group relative flex items-center justify-between hover:bg-indigo-200 dark:hover:bg-indigo-400 border-b dark:border-gray-800 ${
          selected?.id === project.id &&
          'bg-indigo-200 dark:bg-indigo-400 dark:text-white'
        }`}
      >
        {sideOpen && (
          <ul className="absolute top-0.5 right-0.5 text-xs inline-flex">
            {projectTags.map(({ name }) => (
              <li
                key={name}
                className="px-2 ml-0.5 rounded-full w-8 md:w-12 lg:w-14 xl:w-16 text-center z-30 truncate bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              >
                {name}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleClick}
          title={`Select '${project.name}'`}
          type="button"
          className="px-3 py-4 tracking-wider truncate text-left w-full dark:text-gray-100 focus:outline-none z-40"
        >
          <span>
            <ProjectAsterisk projectid={project.id} />
            {project.name}
          </span>
        </button>
      </li>
    </>
  );
};

export default ListProject;
