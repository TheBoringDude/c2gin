import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { ProjectPropsSchema } from './lowdb';

type C2GinProviderProps = {
  children: ReactNode;
};

type C2GinContextProps = {
  selected: ProjectPropsSchema | null;
  setSelected: Dispatch<SetStateAction<ProjectPropsSchema>>;
};

const C2GinContext = createContext<C2GinContextProps>({
  selected: null,
  setSelected: () => {},
});

/* PROVIDER */
const C2GinProvider = ({ children }: C2GinProviderProps) => {
  const [selected, setSelected] = useState<ProjectPropsSchema>({
    id: '',
    name: '',
  });

  return (
    <C2GinContext.Provider value={{ selected, setSelected }}>
      {children}
    </C2GinContext.Provider>
  );
};

export default C2GinProvider;
export { C2GinContext };
