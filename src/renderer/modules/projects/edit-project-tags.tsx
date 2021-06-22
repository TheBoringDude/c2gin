import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import useCurrentProject from '../../hooks/useCurrentProject';

type EditProjectTagsProps = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};

const EditProjectTags = ({ tags, setTags }: EditProjectTagsProps) => {
  const { tags: defaultTags } = useCurrentProject();

  const [filterTags, setFilterTags] = useState<[string, string][]>([]);
  const inputTagRef = useRef<HTMLInputElement>(null);

  const tagAdder = (value: string) => {
    if (!inputTagRef.current) return;

    // check length (maximum of 3 tags only)
    if (tags.length > 3) return;

    // check if value already exists
    const check = tags.filter((tag) => tag === value);
    if (check.length > 0) {
      inputTagRef.current.value = ''; // clear current value
      return;
    }

    // add new tag
    const t = Object.keys(defaultTags).filter(
      (key) => defaultTags[key] === value
    )[0];
    if (!t) return;

    setTags([...tags, t]);
    inputTagRef.current.value = ''; // clear current value

    setFilterTags([]);
    inputTagRef.current.focus();
  };

  const handleAddTag = () => {
    if (!inputTagRef.current) return;

    // get the value
    const { value } = inputTagRef.current;
    if (!value) return;

    tagAdder(value);
  };

  const handleRemoveTag = (tagid: string) => {
    setTags(tags.filter((t) => t !== tagid));
  };

  const handleBackspaceRemoveTag = () => {
    const ts = tags;
    ts.pop();

    setTags(ts);
  };

  const handleFilterTag = () => {
    if (!inputTagRef.current) return;

    const name = inputTagRef.current.value.trim();
    if (!name) {
      setFilterTags([]);
      return;
    }

    const fValues = Object.entries(defaultTags);

    setFilterTags(fValues.filter(([, value]) => value.includes(name)));
  };

  return (
    <div className="mt-2">
      <p className="">Add tags to your project</p>
      <div className="flex items-center border p-2 rounded-lg">
        {tags.map((tag) => (
          <p
            key={defaultTags[tag]}
            className="text-sm mx-1 border p-1 inline-flex items-center rounded-lg"
          >
            {defaultTags[tag]}{' '}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 p-1 border rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </p>
        ))}
        <div className="w-auto">
          <input
            ref={inputTagRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();

                handleAddTag();
                e.currentTarget.focus();
              }

              if (e.key === 'Backspace') {
                handleBackspaceRemoveTag();
              }
            }}
            onKeyUp={() => {
              handleFilterTag();
            }}
            type="text"
            placeholder="... tag"
            className="focus:outline-none"
          />
        </div>
      </div>
      {filterTags.length > 0 && (
        <ul className="w-full bg-gray-50 border -bottom-8 rounded-lg">
          {filterTags.map(([key, value]) => (
            <li key={key}>
              <button
                type="button"
                className="w-full hover:bg-gray-100 p-1"
                onClick={() => tagAdder(value)}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditProjectTags;
