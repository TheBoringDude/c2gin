import {
  ProjectGroupListProps,
  ProjectGroupProps,
  ProjectGroupPropsContainer,
  ProjectGroupPropsContainerBase,
} from '../lib/lowdb';

export interface ActionsGroupEditProps extends ProjectGroupPropsContainerBase {
  moveTo?: string;
}

type ActionsGroup =
  | { type: 'add'; id: string; group: ProjectGroupPropsContainer }
  | { type: 'remove'; id: string }
  | {
      type: 'edit';
      id: string;
      new: ActionsGroupEditProps;
    }
  | { type: 'set'; work: ProjectGroupProps }
  | { type: 'add-list'; id: string; list: ProjectGroupListProps[] }
  | {
      type: 'handle-drag';
      source: { index: number; id: string };
      destination: { index: number; id: string };
    }
  | {
      type: 'drag-group';
      sourceIdx: number;
      destIdx: number;
    }
  | {
      type: 'rename-list';
      id: string;
      list: ProjectGroupListProps;
      index: number;
    }
  | {
      type: 'remove-list';
      id: string;
      index: number;
    };

const GroupReducer = (state: ProjectGroupProps, action: ActionsGroup) => {
  switch (action.type) {
    case 'add':
      return <ProjectGroupProps>{
        ...state,
        [action.id]: action.group,
      };

    case 'remove': {
      // NOTE: delete is not working (needs better solution)

      const vs = Object.keys(state).filter((key) => key !== action.id);
      const s: ProjectGroupProps = {};

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
          moveTo: action.new.moveTo,
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

    case 'drag-group': {
      const arr = Object.entries(state);

      const group = arr[action.sourceIdx];

      arr.splice(action.sourceIdx, 1);
      arr.splice(action.destIdx, 0, group);

      return Object.fromEntries(arr);
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
