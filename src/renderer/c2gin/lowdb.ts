import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

type GroupColorProps = {
  [key: string]: GroupColorColorsProps;
};

type GroupColorColorsProps = {
  key: string;
  bg: string;
  border: string;
};

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

type ProjectWorkPropsContainerBase = {
  title: string;
  description: string;
  color: GroupColorColorsProps;
};

interface ProjectWorkPropsContainer extends ProjectWorkPropsContainerBase {
  id: string;
  list: ProjectWorkListProps[];
}

type ProjectWorkListProps = {
  id: string;
  title: string;
};

const adapter = new LocalStorage<AppSchema>('db');
const db = low(adapter);

db.defaults({ projects: [] }).write();

export {
  ProjectWorkPropsContainer,
  ProjectWorkPropsContainerBase,
  ProjectPropsSchema,
  ProjectWorkListProps,
  ProjectWorkProps,
  AppSchema,
  GroupColorProps,
};
export default db;
