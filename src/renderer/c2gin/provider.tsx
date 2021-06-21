import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import db, { ProjectPropsSchema, ProjectTagsSchema } from '../lib/lowdb';

type C2GinProviderProps = {
  children: ReactNode;
};

type UIModes = 'dark' | 'light' | string;

type C2GinContextProps = {
  projects: ProjectPropsSchema[];
  setProjects: Dispatch<SetStateAction<ProjectPropsSchema[]>>;
  tags: ProjectTagsSchema;
  setTags: Dispatch<SetStateAction<ProjectTagsSchema>>;
  selected: ProjectPropsSchema;
  setSelected: (id: string) => void;
  handleReRead: () => void;
  // handleUpdate: () => void;
  mode: UIModes;
  toggleMode: () => void;
};

const initContext = {
  id: '',
  name: '',
  createdDate: '',
  works: {},
  mode: 'light',
};

const C2GinContext = createContext<C2GinContextProps>({
  projects: [],
  setProjects: () => {},
  tags: {},
  setTags: () => {},
  selected: initContext,
  setSelected: () => {},
  handleReRead: () => {},
  // handleUpdate: () => {},
  mode: 'light',
  toggleMode: () => {},
});

const getProjects = () => {
  return db.get('projects').value();
};

const getTags = () => {
  return db.get('tags').value();
};

const getInitTheme = (): UIModes => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (!userMedia.matches) {
      return 'dark';
    }
  }

  return 'light';
};

const setClassTHeme = (t: string) => {
  const root = window.document.documentElement;
  root.classList.remove(t === 'dark' ? 'light' : 'dark');
  root.classList.add(t);
  window.localStorage.setItem('theme', t);
};

const handleTheme = () => {
  const t = getInitTheme();
  setClassTHeme(t);

  return t;
};

/* PROVIDER */
const C2GinProvider = ({ children }: C2GinProviderProps) => {
  const [selected, setSelected] = useState<ProjectPropsSchema>(initContext);
  const [projects, setProjects] = useState<ProjectPropsSchema[]>(getProjects());
  const [tags, setTags] = useState<ProjectTagsSchema>(getTags());
  const [mode, setMode] = useState<UIModes>(handleTheme());

  /* handler for reading th specific project */
  const handleSetSelected = (id: string) => {
    setSelected(db.get('projects').find({ id }).value());
  };

  /* re-reading th projects */
  const handleReRead = () => {
    setProjects(getProjects());
  };

  /* mode toggline - dark / light */
  const toggleMode = () => {
    const isDark = mode === 'dark';
    const t = isDark ? 'light' : 'dark';

    setClassTHeme(t);
    setMode(t);
  };

  return (
    <C2GinContext.Provider
      value={{
        selected,
        setSelected: handleSetSelected,
        projects,
        setProjects,
        tags,
        setTags,
        handleReRead,
        mode,
        toggleMode,
      }}
    >
      {children}
    </C2GinContext.Provider>
  );
};

export default C2GinProvider;
export { C2GinContext };
