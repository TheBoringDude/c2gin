import { ProjectWorkProps, ProjectWorkPropsContainer } from '../c2gin/lowdb';

type ActionsGroup =
  | { type: 'add'; id: string; group: ProjectWorkPropsContainer }
  | { type: 'remove'; id: string }
  | { type: 'set'; work: ProjectWorkProps };

const GroupReducer = (state: ProjectWorkProps, action: ActionsGroup) => {
  switch (action.type) {
    case 'add':
      return <ProjectWorkProps>{
        ...state,
        [action.id]: action.group,
      };

    case 'remove':
      delete state[action.id];
      return state;

    case 'set':
      return {
        ...action.work,
      };

    default:
      return state;
  }
};

export default GroupReducer;
export { ActionsGroup };
