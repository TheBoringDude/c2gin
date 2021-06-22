import React, { Dispatch } from 'react';
import { ProjectTagsSchema } from '../../lib/lowdb';
import { TagsManagerReducerActions } from '../../reducers/tags-manager';

type ListTagsProps = {
  tags: ProjectTagsSchema[];
  dispatch: Dispatch<TagsManagerReducerActions>;
};

const ListTags = ({ tags, dispatch }: ListTagsProps) => {
  const handleRemoveTag = (name: string) => {
    dispatch({ type: 'remove', name });
  };

  return (
    <ul className="my-2">
      {tags?.map(({ name }) => (
        <li
          key={name}
          className="group py-2 px-4 rounded-lg m-1 border border-indigo-300 flex items-center justify-between"
        >
          <p>{name}</p>
          <button
            onClick={() => handleRemoveTag(name)}
            title="Remove Tag"
            type="button"
            className="group-hover:block hidden text-gray-600 hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListTags;
