import { ProjectTagsSchema } from '../lib/lowdb';

type TagsManagerReducerActions =
  | { type: 'remove'; name: string }
  | { type: 'add'; name: string }
  | { type: 'set'; state: ProjectTagsSchema[] };

const TagsManagerReducer = (
  state: ProjectTagsSchema[],
  action: TagsManagerReducerActions
) => {
  switch (action.type) {
    // remove a tag
    case 'remove': {
      const s = state.filter((tag) => tag.name !== action.name);

      return s;
    }

    // add a new tag
    case 'add':
      return <ProjectTagsSchema[]>[
        {
          name: action.name,
          project: [],
        },
        ...state,
      ];

    // set the state value
    case 'set':
      return action.state;

    // default case
    default:
      return state;
  }
};

export default TagsManagerReducer;
export { TagsManagerReducerActions };
