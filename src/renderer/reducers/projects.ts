import { ProjectPropsSchema } from '../lib/lowdb';

type ProjectsReducerActionProps = {
  type: 'set';
  projects: ProjectPropsSchema[];
};

const ProjectsReducer = (
  state: ProjectPropsSchema[],
  action: ProjectsReducerActionProps
) => {
  switch (action.type) {
    case 'set':
      return action.projects;
    default:
      return state;
  }
};

export default ProjectsReducer;
export { ProjectsReducerActionProps };
