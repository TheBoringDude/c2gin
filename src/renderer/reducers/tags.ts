import { ProjectTagsSchema } from '../lib/lowdb';

type ActionsTags =
  | { type: 'remove'; id: string }
  | { type: 'add'; id: string; name: string }
  | { type: 'set'; state: ProjectTagsSchema };

const TagsReducer = (state: ProjectTagsSchema, action: ActionsTags) => {
  switch (action.type) {
    // remove a tag
    case 'remove': {
      const vs = Object.keys(state).filter((key) => key !== action.id);
      const s: ProjectTagsSchema = {};

      // eslint-disable-next-line array-callback-return
      vs.map((k) => {
        s[k] = state[k];
      });

      return s;
    }

    // add a new tag
    case 'add':
      return {
        [action.id]: action.name,
        ...state,
      };

    // set the state value
    case 'set':
      return action.state;

    // default case
    default:
      return state;
  }
};

export default TagsReducer;
export { ActionsTags };
