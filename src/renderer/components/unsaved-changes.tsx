import { Dialog } from '@headlessui/react';
import React, { useRef } from 'react';
import Modal from './modals';

type UnsavedChangesModalProps = {
  f: () => void;
  open: boolean;
  onClose: () => void;
};

const UnsavedChangesModal = ({
  f,
  open,
  onClose,
}: UnsavedChangesModalProps) => {
  // btn cancel ref for modal focus
  const btnCancelRef = useRef<HTMLButtonElement>(null);

  // continue function
  const continueFunction = () => {
    // execute def function
    f();

    // close modal
    onClose();
  };

  return (
    <>
      {open && (
        <Modal open={open} onClose={onClose} focusRef={btnCancelRef}>
          <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
            Unsaved Changes
          </Dialog.Title>

          <div className="mt-4">
            <p className="tracking-wide mx-2">
              You currently have unsaved changes, do you still want to proceed?
              The changes you made will be reverted.
            </p>

            <div className="text-center mt-8">
              <button
                onClick={continueFunction}
                type="button"
                className="py-2 px-6 rounded-lg bg-indigo-500 opacity-75 hover:opacity-100 text-white"
              >
                Continue
              </button>
              <button
                ref={btnCancelRef}
                onClick={onClose}
                type="button"
                className="ml-2 py-2 px-6 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UnsavedChangesModal;
