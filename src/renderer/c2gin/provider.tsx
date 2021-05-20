import React, { createContext, ReactNode, useState } from 'react';
import db, { ProjectPropsSchema } from './lowdb';

type C2GinProviderProps = {
  children: ReactNode;
};

type C2GinContextProps = {
  selected: ProjectPropsSchema;
  setSelected: (id: string) => void;
};

const initContext = {
  id: '',
  name: '',
  createdDate: '',
  works: {},
};

const C2GinContext = createContext<C2GinContextProps>({
  selected: initContext,
  setSelected: () => {},
});

/* PROVIDER */
const C2GinProvider = ({ children }: C2GinProviderProps) => {
  const [selected, setSelected] = useState<ProjectPropsSchema>(initContext);

  const handleSetSelected = (id: string) => {
    setSelected(db.get('projects').find({ id }).value());
  };

  return (
    <C2GinContext.Provider value={{ selected, setSelected: handleSetSelected }}>
      {children}
    </C2GinContext.Provider>
  );
};

export default C2GinProvider;
export { C2GinContext };
