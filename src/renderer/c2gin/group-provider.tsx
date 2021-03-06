import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useReducer,
  useState,
} from 'react';
import { ProjectGroupProps } from '../lib/lowdb';
import GroupReducer, { ActionsGroup } from '../reducers/group';

type WorkProviderProps = {
  initialState: ProjectGroupProps;
  children: ReactNode;
};
type WorkProviderContextProps = {
  updated: boolean;
  setUpdated: Dispatch<SetStateAction<boolean>>;
  state: ProjectGroupProps;
  dispatch: Dispatch<ActionsGroup>;
  openUnsaved: boolean;
  setOpenUnsaved: Dispatch<SetStateAction<boolean>>;
};

export const WorkProviderContext = createContext<WorkProviderContextProps>({
  updated: false,
  setUpdated: () => {},
  state: {},
  dispatch: () => {},
  openUnsaved: false,
  setOpenUnsaved: () => {},
});

export default function WorkProvider({
  initialState,
  children,
}: WorkProviderProps) {
  const [state, dispatch] = useReducer(GroupReducer, initialState);
  const [updated, setUpdated] = useState(false);
  const [openUnsaved, setOpenUnsaved] = useState(false);

  // a custom wrapper to dispatch function from useReducer
  const dispatcher: Dispatch<ActionsGroup> = (a: ActionsGroup) => {
    dispatch(a);
    setUpdated(true);
  };

  return (
    <WorkProviderContext.Provider
      value={{
        state,
        dispatch: dispatcher,
        updated,
        setUpdated,
        openUnsaved,
        setOpenUnsaved,
      }}
    >
      {children}
    </WorkProviderContext.Provider>
  );
}
