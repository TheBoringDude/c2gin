import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useReducer,
  useState,
} from 'react';
import GroupReducer, { ActionsGroup } from '../reducers/workgroups';
import { ProjectWorkProps } from '../lib/lowdb';

type WorkProviderProps = {
  initialState: ProjectWorkProps;
  children: ReactNode;
};
type WorkProviderContextProps = {
  updated: boolean;
  setUpdated: Dispatch<SetStateAction<boolean>>;
  state: ProjectWorkProps;
  dispatch: Dispatch<ActionsGroup>;
};

export const WorkProviderContext = createContext<WorkProviderContextProps>({
  updated: false,
  setUpdated: () => {},
  state: {},
  dispatch: () => {},
});

export default function WorkProvider({
  initialState,
  children,
}: WorkProviderProps) {
  const [state, dispatch] = useReducer(GroupReducer, initialState);
  const [updated, setUpdated] = useState(false);

  // a custom wrapper to dispatch function from useReducer
  const dispatcher: Dispatch<ActionsGroup> = (a: ActionsGroup) => {
    dispatch(a);
    setUpdated(true);
  };

  return (
    <WorkProviderContext.Provider
      value={{ state, dispatch: dispatcher, updated, setUpdated }}
    >
      {children}
    </WorkProviderContext.Provider>
  );
}
