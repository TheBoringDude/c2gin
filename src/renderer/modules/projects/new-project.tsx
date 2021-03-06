import { DocumentAddIcon } from '@heroicons/react/outline';
import { nanoid } from 'nanoid';
import React, { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import UnsavedChangesModal from '../../components/unsaved-changes';
import useCurrentProject from '../../hooks/useCurrentProject';
import useGroup from '../../hooks/useGroup';
import useSideBar from '../../hooks/useSideBar';
import db, { ProjectTagsSchema } from '../../lib/lowdb';
import ProjectModal from './project-modal';

const NewProjectHandler = () => {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<ProjectTagsSchema[]>([]);
  const [openUnsaved, setOpenUnsaved] = useState(false);

  const {
    selected,
    dispatchTags,
    setSelected,
    setModified,
  } = useCurrentProject();
  const { state, dispatch, updated } = useGroup();
  const { sideOpen } = useSideBar();

  const inputProjectRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    setOpen(false);
    setTags([]);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleOpenModal = () => {
    if (selected?.id && updated) {
      setOpenUnsaved(true);
      return;
    }

    setOpen(true);
  };

  const handlerWrapper = () => {
    const projectName = inputProjectRef.current?.value || '';
    if (!projectName) return;

    // automatically save current selected project's progress
    // if (selected?.works !== state) {
    //   handleProjectSave(selected?.id, state);
    // }

    // new project
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
    setModified(true);

    closeModal();
  };

  /* shortcut: for creating a new project */
  useHotkeys(
    'ctrl+p',
    () => {
      handleOpenModal();
    },
    [updated, state]
  );

  return (
    <>
      <UnsavedChangesModal
        open={openUnsaved}
        onClose={() => {
          setOpenUnsaved(false);
        }}
        f={openModal}
      />

      <button
        type="button"
        onClick={handleOpenModal}
        title="Create a new project"
        className="py-1 text-sm rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white inline-flex items-center justify-center w-full"
      >
        <DocumentAddIcon className="h-5 w-5" />
        {sideOpen && <span className="ml-1 lowercase">New Project</span>}
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
