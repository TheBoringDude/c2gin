import React, { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useCurrentProject from '../../hooks/useCurrentProject';
import useProjectTags from '../../hooks/useTags';
import useWorkGroup from '../../hooks/useWorkGroup';
import { ProjectTagsSchema } from '../../lib/lowdb';
import { handleProjectSave } from '../../lib/queries';
import ProjectModal from './project-modal';

const EditProject = () => {
  const [open, setOpen] = useState(false);

  const {
    selected,
    dispatchTags,
    // tags: defaultTags,
    setModified,
  } = useCurrentProject();
  const projectTags = useProjectTags(selected.id);
  const [tags, setTags] = useState<ProjectTagsSchema[]>(projectTags);
  const { state } = useWorkGroup();

  const inputProjectRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    setTags([]); // remove the current project tags from editor
    setOpen(false);
  };
  const openModal = () => {
    setTags(projectTags); // set the tags to the editor
    setOpen(true);
  };

  /* save button function wrapper */
  const handlerWrapper = () => {
    // old project tags
    const dt = projectTags.filter((t) => !tags.includes(t));
    // new project tags
    const nt = tags.filter((t) => !dt.includes(t));

    // remove the project from the removed tags
    dt.forEach((tag) => {
      dispatchTags({
        type: 'remove-project',
        tagname: tag.name,
        projectid: selected.id,
      });
    });

    // add the project from the added tags
    nt.forEach((tag) => {
      dispatchTags({
        type: 'add-project',
        tagname: tag.name,
        projectid: selected.id,
      });
    });

    setModified(true);

    // automatically save current selected project's progress
    handleProjectSave(selected?.id, state);

    closeModal();
  };

  /* shortcut: for opening the edit project modal */
  useHotkeys('ctrl+t', () => {
    if (selected) {
      openModal();
    }
  });

  return (
    <>
      <button
        title="Edit Project"
        type="button"
        onClick={openModal}
        className="ml-2 text-gray-700 dark:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <ProjectModal
        title="Edit Project"
        closeModal={closeModal}
        handlerWrapper={handlerWrapper}
        inputProjectRef={inputProjectRef}
        open={open}
        tags={tags}
        setTags={setTags}
        defaultProjectName={selected?.name}
      >
        <button
          type="button"
          className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
          onClick={handlerWrapper}
        >
          Edit Project
        </button>
      </ProjectModal>
    </>
  );
};

export default EditProject;
