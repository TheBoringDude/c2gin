import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';
import GroupReducer, { ActionsGroup } from '../reducers/workgroups';
import { ProjectWorkProps } from './lowdb';

type WorkProviderProps = {
  initialState: ProjectWorkProps;
  children: ReactNode;
};
type WorkProviderContextProps = {
  state: ProjectWorkProps;
  dispatch: Dispatch<ActionsGroup>;
};

export const WorkProviderContext = createContext<WorkProviderContextProps>({
  state: {},
  dispatch: () => {},
});

export default function WorkProvider({
  initialState,
  children,
}: WorkProviderProps) {
  const [state, dispatch] = useReducer(GroupReducer, initialState);

  return (
    <WorkProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkProviderContext.Provider>
  );
}
