import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import db, { ProjectPropsSchema } from './lowdb';

type C2GinProviderProps = {
  children: ReactNode;
};

type C2GinContextProps = {
  projects: ProjectPropsSchema[];
  setProjects: Dispatch<SetStateAction<ProjectPropsSchema[]>>;
  selected: ProjectPropsSchema;
  setSelected: (id: string) => void;
  handleReRead: () => void;
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
  selected: initContext,
  setSelected: () => {},
  handleReRead: () => {},
});

const getProjects = () => {
  return db.get('projects').value();
};

/* PROVIDER */
const C2GinProvider = ({ children }: C2GinProviderProps) => {
  const [selected, setSelected] = useState<ProjectPropsSchema>(initContext);
  const [projects, setProjects] = useState<ProjectPropsSchema[]>(getProjects());

  const handleSetSelected = (id: string) => {
    setSelected(db.get('projects').find({ id }).value());
  };

  const handleReRead = () => {
    setProjects(getProjects);
  };

  return (
    <C2GinContext.Provider
      value={{
        selected,
        setSelected: handleSetSelected,
        projects,
        setProjects,
        handleReRead,
      }}
    >
      {children}
    </C2GinContext.Provider>
  );
};

export default C2GinProvider;
export { C2GinContext };
