import {
  ProjectWorkListProps,
  ProjectWorkProps,
  ProjectWorkPropsContainer,
  ProjectWorkPropsContainerBase,
} from '../c2gin/lowdb';

type ActionsGroup =
  | { type: 'add'; id: string; group: ProjectWorkPropsContainer }
  | { type: 'remove'; id: string }
  | {
      type: 'edit';
      id: string;
      new: ProjectWorkPropsContainerBase;
    }
  | { type: 'set'; work: ProjectWorkProps }
  | { type: 'add-list'; id: string; list: ProjectWorkListProps[] }
  | {
      type: 'handle-drag';
      source: { index: number; id: string };
      destination: { index: number; id: string };
    }
  | {
      type: 'rename-list';
      id: string;
      list: ProjectWorkListProps;
      index: number;
    }
  | {
      type: 'remove-list';
      id: string;
      index: number;
    };

const GroupReducer = (state: ProjectWorkProps, action: ActionsGroup) => {
  switch (action.type) {
    case 'add':
      return <ProjectWorkProps>{
        ...state,
        [action.id]: action.group,
      };

    case 'remove': {
      // NOTE: delete is not working (needs better solution)

      const vs = Object.keys(state).filter((key) => key !== action.id);
      const s: ProjectWorkProps = {};

      // eslint-disable-next-line array-callback-return
      vs.map((k) => {
        s[k] = state[k];
      });

      return s;
    }

    case 'edit':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          title: action.new.title,
          description: action.new.description,
          color: action.new.color,
        },
      };

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

    case 'rename-list': {
      const s = Array.from(state[action.id].list);

      s.splice(action.index, 1);
      s.splice(action.index, 0, action.list);

      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          list: s,
        },
      };
    }

    case 'remove-list': {
      const newlist = state[action.id].list.filter(
        (_, index) => index !== action.index
      );

      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          list: newlist,
        },
      };
    }

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
