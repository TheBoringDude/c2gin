import { Dialog } from '@headlessui/react';
import React, { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import Modal from '../../components/modals';
import { ProjectTagsSchema } from '../../lib/lowdb';
import EditProjectTags from './edit-project-tags';

type ProjectModalProps = {
  open: boolean;
  title: string;
  closeModal: () => void;
  inputProjectRef: RefObject<HTMLInputElement>;
  handlerWrapper: () => void;
  children: ReactNode;
  tags: ProjectTagsSchema[];
  setTags: Dispatch<SetStateAction<ProjectTagsSchema[]>>;
  // eslint-disable-next-line react/require-default-props
  defaultProjectName?: string;
};

const ProjectModal = ({
  open,
  closeModal,
  inputProjectRef,
  handlerWrapper,
  children,
  tags,
  title,
  setTags,
  defaultProjectName,
}: ProjectModalProps) => {
  return (
    <Modal open={open} onClose={closeModal} focusRef={inputProjectRef}>
      <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
        {title}
      </Dialog.Title>
      <div className="mt-2">
        <div className="flex flex-col">
          <p className="">What is your project&apos;s name?</p>
          <input
            ref={inputProjectRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handlerWrapper();
              }
            }}
            type="text"
            placeholder="Your project's name"
            defaultValue={defaultProjectName}
            className="tracking-wide py-2 px-3 rounded-lg border-2 focus:outline-none hover:border-indigo-300 focus:border-indigo-300"
          />
        </div>
      </div>
      <EditProjectTags tags={tags} setTags={setTags} />
      <div className="mt-4">{children}</div>
    </Modal>
  );
};

export default ProjectModal;
