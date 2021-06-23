import { ProjectTagsSchema } from '../lib/lowdb';

type TagsReducerActions =
  | { type: 'remove'; name: string }
  | { type: 'add'; name: string }
  | { type: 'set'; state: ProjectTagsSchema[] }
  | { type: 'add-project'; projectid: string; tagname: string }
  | { type: 'remove-project'; projectid: string; tagname: string };

const TagsReducer = (
  state: ProjectTagsSchema[],
  action: TagsReducerActions
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

    case 'add-project':
      return state.map((t) => {
        if (t.name === action.tagname) {
          const op = t.projects ? t.projects : []; // why is it undefined?
          t.projects = [...op, action.projectid];
        }

        return t;
      });

    case 'remove-project':
      return state.map((t) => {
        if (t.name === action.tagname) {
          if (t.projects) {
            t.projects = t.projects.filter((p) => p !== action.projectid);
          }
        }
        return t;
      });

    // set the state value
    case 'set':
      return action.state;

    // default case
    default:
      return state;
  }
};

export default TagsReducer;
export { TagsReducerActions };
