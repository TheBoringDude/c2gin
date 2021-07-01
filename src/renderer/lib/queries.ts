/* eslint-disable import/prefer-default-export */

import db, { ProjectGroupProps, ProjectTagsSchema } from './lowdb';

const handleProjectSave = (id: string, state: ProjectGroupProps) => {
  db.get('projects').find({ id }).set('works', state).write();
};

// const handleProjectTagsSave = (id: string, tags: ProjectTagsSchema[]) => {
//   db.get('projects').find({ id }).set('tags', tags).write();
// };

const handleTagsSave = (state: ProjectTagsSchema[]) => {
  db.set('tags', state).write();
};

const handleRenameProject = (id: string, name: string) => {
  db.get('projects').find({ id }).set('name', name).write();
};

export { handleProjectSave, handleTagsSave, handleRenameProject };
