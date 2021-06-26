import { DocumentAddIcon } from '@heroicons/react/outline';
import { nanoid } from 'nanoid';
import React, { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useCurrentProject from '../../hooks/useCurrentProject';
import useWorkGroup from '../../hooks/useWorkGroup';
import db, { ProjectTagsSchema } from '../../lib/lowdb';
import { handleProjectSave } from '../../lib/queries';
import ProjectModal from './project-modal';

interface NewProjectHandlerProps {
  sideOpen: boolean;
}

const NewProjectHandler = ({ sideOpen }: NewProjectHandlerProps) => {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<ProjectTagsSchema[]>([]);

  const { selected, dispatchTags, setSelected } = useCurrentProject();
  const { state, dispatch } = useWorkGroup();

  const inputProjectRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    setOpen(false);
    setTags([]);
  };
  const openModal = () => {
    setOpen(true);
  };

  const handlerWrapper = () => {
    const projectName = inputProjectRef.current?.value || '';
    if (!projectName) return;

    const proj = {
      id: nanoid(12),
      name: projectName,
      createdDate: new Date().toISOString(),
      works: {},
    };

    db.get('projects').push(proj).write();

    setSelected(proj.id);

    // set the state works
    dispatch({
      type: 'set',
      work: proj.works,
    });

    tags.forEach((tag) => {
      dispatchTags({
        type: 'add-project',
        tagname: tag.name,
        projectid: proj.id,
      });
    });

    // automatically save current selected project's progress
    if (selected?.works !== state) {
      handleProjectSave(selected?.id, state);
    }

    closeModal();
  };

  /* shortcut: for creating a new project */
  useHotkeys('ctrl+p', () => {
    openModal();
  });

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        title="Create a new project"
        className="py-1 text-sm rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white inline-flex items-center justify-center w-full"
      >
        <DocumentAddIcon className="h-5 w-5" />
        {sideOpen && <span className="ml-1">New Project</span>}
      </button>

      <ProjectModal
        title="Create New Project Project"
        closeModal={closeModal}
        handlerWrapper={handlerWrapper}
        inputProjectRef={inputProjectRef}
        open={open}
        tags={tags}
        setTags={setTags}
      >
        <button
          type="button"
          className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
          onClick={handlerWrapper}
        >
          Create Project
        </button>
      </ProjectModal>
    </>
  );
};

export default NewProjectHandler;
