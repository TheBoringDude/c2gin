import {
  ProjectWorkListProps,
  ProjectWorkProps,
  ProjectWorkPropsContainer,
} from '../c2gin/lowdb';

type ActionsGroup =
  | { type: 'add'; id: string; group: ProjectWorkPropsContainer }
  | { type: 'remove'; id: string }
  | { type: 'set'; work: ProjectWorkProps }
  | { type: 'add-list'; id: string; list: ProjectWorkListProps[] }
  | {
      type: 'handle-drag';
      source: { index: number; id: string };
      destination: { index: number; id: string };
    };

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

    case 'add-list':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          list: action.list,
        },
      };
    case 'handle-drag': {
      // TODO: It might need re-factoring.

      const source = Array.from(state[action.source.id].list);

      if (action.source.id === action.destination.id) {
        const v = source[action.source.index];

        source.splice(action.source.index, 1);
        source.splice(action.destination.index, 0, v);

        return {
          ...state,
          [action.source.id]: {
            ...state[action.source.id],
            list: source,
          },
        };
      }

      const destination = Array.from(state[action.destination.id].list);

      const s = source[action.source.index];

      const newSource = source.filter(
        (_, index) => index !== action.source.index
      );
      destination.splice(action.destination.index, 0, s);

      return {
        ...state,
        [action.source.id]: {
          ...state[action.source.id],
          list: newSource,
        },
        [action.destination.id]: {
          ...state[action.destination.id],
          list: destination,
        },
      };
    }

    default:
      return state;
  }
};

export default GroupReducer;
export { ActionsGroup };
