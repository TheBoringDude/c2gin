import React, { useState, Fragment, MutableRefObject } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface NewProjectHandlerProps {
  HandleCreateProject: () => void;
  inputProjectRef: MutableRefObject<HTMLInputElement | null>;
}

const NewProjectHandler = ({
  HandleCreateProject,
  inputProjectRef,
}: NewProjectHandlerProps) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const handlerWrapper = () => {
    HandleCreateProject();
    closeModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="py-1 px-4 text-sm rounded-lg bg-indigo-400 hover:bg-indigo-500 text-white"
      >
        New Project
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center bg-bland-200">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  New Project
                </Dialog.Title>
                <div className="mt-2">
                  <div className="flex flex-col">
                    <p className="">What is your project&apos;s name?</p>
                    <input
                      ref={inputProjectRef}
                      type="text"
                      placeholder="Your project's name"
                      className="tracking-wide py-2 px-3 rounded-lg border-2 focus:outline-none hover:border-indigo-300 focus:border-indigo-300"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="py-2 px-8 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg"
                    onClick={handlerWrapper}
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewProjectHandler;
