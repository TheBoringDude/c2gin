import { Dispatch, useReducer } from 'react';
import { ProjectWorkProps } from '../c2gin/lowdb';
import GroupReducer, { ActionsGroup } from '../reducers/workgroups';

type GroupDispatch = [ProjectWorkProps, Dispatch<ActionsGroup>];

// THIS WILL BE RE-WRITTING FOR USING A PROVIDER
export default function useWorkGroupDispatch(): GroupDispatch {
  const [state, dispatch] = useReducer(GroupReducer, {});

  return [state, dispatch];
}
