/* eslint-disable import/prefer-default-export */

import db, { ProjectWorkProps } from './lowdb';

const handleProjectSave = (id: string, state: ProjectWorkProps) => {
  db.get('projects').find({ id }).set('works', state).write();
};

export { handleProjectSave };
