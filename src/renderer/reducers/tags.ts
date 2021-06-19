import { ProjectTagsSchema } from '../lib/lowdb';

type ActionsTags =
  | { type: 'remove'; id: string }
  | { type: 'add'; tag: ProjectTagsSchema }
  | { type: 'set'; state: ProjectTagsSchema[] };

const TagsReducer = (state: ProjectTagsSchema[], action: ActionsTags) => {
  switch (action.type) {
    // remove a tag
    case 'remove':
      return state.filter((tag) => tag.id !== action.id);

    // add a new tag
    case 'add':
      return [action.tag, ...state];

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
