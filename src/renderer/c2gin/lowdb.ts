import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

type AppSchema = {
  projects: ProjectPropsSchema[];
};

type ProjectPropsSchema = {
  id: string;
  name: string;
  createdDate: string;
  works: ProjectWorkProps;
};

type ProjectWorkProps = {
  [key: string]: ProjectWorkPropsContainer;
};
type ProjectWorkPropsContainer = {
  id: string;
  title: string;
  description: string;
  list: ProjectWorkListProps[];
};

type ProjectWorkListProps = {
  id: string;
  title: string;
};

const adapter = new LocalStorage<AppSchema>('db');
const db = low(adapter);

db.defaults({ projects: [] }).write();

export {
  ProjectWorkPropsContainer,
  ProjectPropsSchema,
  ProjectWorkListProps,
  ProjectWorkProps,
  AppSchema,
};
export default db;
