import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

type AppSchema = {
  projects: ProjectPropsSchema[];
};

type ProjectPropsSchema = {
  id: string;
  name: string;
  works?: ProjectWorkProps[];
};

type ProjectWorkProps = {
  [key: string]: ProjectWorkCategoryProps[];
};

type ProjectWorkCategoryProps = {
  id: string;
  title: string;
};

const adapter = new LocalStorage<AppSchema>('db');
const db = low(adapter);

db.defaults({ projects: [] }).write();

export {
  ProjectPropsSchema,
  ProjectWorkCategoryProps,
  ProjectWorkProps,
  AppSchema,
};
export default db;
