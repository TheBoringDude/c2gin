import { Dialog } from '@headlessui/react';
import React, { KeyboardEvent, MutableRefObject, ReactNode } from 'react';
import Modal from '../../components/modals';
import useGroup from '../../hooks/useGroup';
import GroupColors from '../../lib/colors';

type WorkGroupModalProps = {
  open: boolean;
  closeModal: () => void;
  groupId: string | null;
  inputGroupNameRef: MutableRefObject<HTMLInputElement | null>;
  inputGroupDescriptionRef: MutableRefObject<HTMLInputElement | null>;
  nameDefValue: string;
  descriptionDefValue: string;
  selectThemeRef: MutableRefObject<HTMLSelectElement | null>;
  selectThemeDefValue: string;
  moveToRef: MutableRefObject<HTMLSelectElement | null>;
  moveToDefValue: string;
  children: ReactNode;
  dialogTitle: string;
  handleOnEnter: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export default function WorkGroupModal({
  open,
  closeModal,
  inputGroupDescriptionRef,
  inputGroupNameRef,
  nameDefValue,
  descriptionDefValue,
  selectThemeRef,
  selectThemeDefValue,
  dialogTitle,
  children,
  handleOnEnter,
  groupId,
  moveToRef,
  moveToDefValue,
}: WorkGroupModalProps) {
  // TODO:
  // const { state } = useGroup();
  // const entries = Object.entries(state);
  const { state: items } = useGroup();
  const groups = Object.entries(items).filter(
    ([, item]) => item.id !== groupId
  );

  return (
    <Modal open={open} onClose={closeModal} focusRef={inputGroupNameRef}>
      <Dialog.Title as="h3" className="text-lg font-bold text-gray-900">
        {dialogTitle}
      </Dialog.Title>
      <div className="mt-2">
        <div className="flex flex-col my-1">
          <p className="">Title of the Category</p>
          <input
            ref={inputGroupNameRef}
            onKeyDown={(e) => handleOnEnter(e)}
            type="text"
            defaultValue={nameDefValue}
            placeholder="Input your project's new work category"
            className="tracking-wide py-2 px-3 rounded-lg border-2 focus:outline-none hover:border-indigo-300 focus:border-indigo-300"
          />
        </div>
        <div className="flex flex-col my-1">
          <p>Description for the category</p>
          <input
            ref={inputGroupDescriptionRef}
            onKeyDown={(e) => handleOnEnter(e)}
            type="text"
            defaultValue={descriptionDefValue}
            placeholder="A description for the group category"
            className="tracking-wide py-1 px-3 rounded-lg border-2 focus:outline-none hover:border-indigo-300 focus:border-indigo-300"
          />
        </div>
        <div className="flex flex-col my-1">
          <p>Theme of the category</p>
          <select
            defaultValue={selectThemeDefValue}
            ref={selectThemeRef}
            className="bg-white py-1 px-3 border-2 rounded-lg"
          >
            {Object.entries(GroupColors).map(([key]) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col my-1">
          <p title="If an item is checked or marked as done, the item will be moved to this group.">
            Move To
          </p>
          <select
            defaultValue={moveToDefValue}
            ref={moveToRef}
            className="bg-white py-1 px-3 border-2 rounded-lg"
          >
            <option value="">[none]</option>
            {groups.map(([key, item]) => (
              <option key={key} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">{children}</div>
    </Modal>
  );
}
