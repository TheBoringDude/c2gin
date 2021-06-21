import { ProjectPropsSchema } from '../lib/lowdb';

type SelectedReducerActionProps = { type: 'set'; project: ProjectPropsSchema };

const SelectedReducer = (
  state: ProjectPropsSchema,
  action: SelectedReducerActionProps
) => {
  switch (action.type) {
    case 'set':
      return action.project;
    default:
      return state;
  }
};

export default SelectedReducer;
export { SelectedReducerActionProps };
