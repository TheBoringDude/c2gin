// sidebar provider

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type SideContextProps = {
  sideOpen: boolean;
  setSideOpen: Dispatch<SetStateAction<boolean>>;
};

type SideContextProviderProps = {
  children: ReactNode;
};

const initSideContext: SideContextProps = {
  sideOpen: true,
  setSideOpen: () => {},
};

const SideContext = createContext<SideContextProps>(initSideContext);

const SideContextProvider = ({ children }: SideContextProviderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <SideContext.Provider value={{ sideOpen: open, setSideOpen: setOpen }}>
      {children}
    </SideContext.Provider>
  );
};

export default SideContextProvider;
export { SideContext };
