import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react';
import db, { ProjectPropsSchema, ProjectTagsSchema } from '../lib/lowdb';
import { handleTagsSave } from '../lib/queries';
import ProjectsReducer from '../reducers/projects';
import TagsReducer, { TagsReducerActions } from '../reducers/tags';

type C2GinProviderProps = {
  children: ReactNode;
};

type C2GinContextProps = {
  projects: ProjectPropsSchema[];
  setProjects: Dispatch<ProjectPropsSchema[]>;
  tags: ProjectTagsSchema[];
  dispatchTags: Dispatch<TagsReducerActions>;
  selected: ProjectPropsSchema;
  setSelected: (id: string) => void;
  handleReRead: () => void;
  // handleUpdate: () => void;
  modified: boolean;
  setModified: Dispatch<SetStateAction<boolean>>;
};

const initContext = {
  id: '',
  name: '',
  createdDate: '',
  works: {},
};

const C2GinContext = createContext<C2GinContextProps>({
  projects: [],
  setProjects: () => {},
  tags: [],
  dispatchTags: () => {},
  selected: initContext,
  setSelected: () => {},
  handleReRead: () => {},
  // handleUpdate: () => {},
  modified: false,
  setModified: () => {},
});

const getProjects = () => {
  return db.get('projects').value();
};

const getTags = () => {
  return db.get('tags').value();
};

/* PROVIDER */
const C2GinProvider = ({ children }: C2GinProviderProps) => {
  const [selected, setSelected] = useState<ProjectPropsSchema>(initContext);
  const [projects, dispatchProjects] = useReducer(
    ProjectsReducer,
    getProjects()
  );
  const [tags, dispatchTags] = useReducer(TagsReducer, getTags());

  const [modified, setModified] = useState(false);

  // wrapper for setter for ProjectsReducer
  const setProjects = (ps: ProjectPropsSchema[]) => {
    dispatchProjects({ type: 'set', projects: ps });
  };

  /* handler for reading th specific project */
  const handleSetSelected = (id: string) => {
    setSelected(db.get('projects').find({ id }).value());
  };

  /* re-reading th projects */
  const handleReRead = () => {
    dispatchProjects({ type: 'set', projects: getProjects() });
  };

  useEffect(() => {
    if (modified) {
      handleTagsSave(tags);

      setModified(false);
    }
  }, [modified, tags]);

  return (
    <C2GinContext.Provider
      value={{
        selected,
        setSelected: handleSetSelected,
        projects,
        setProjects,
        tags,
        dispatchTags,
        handleReRead,
        modified,
        setModified,
      }}
    >
      {children}
    </C2GinContext.Provider>
  );
};

export default C2GinProvider;
export { C2GinContext };
