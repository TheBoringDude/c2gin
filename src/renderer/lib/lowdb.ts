import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import { Colors } from './colors';

type AppSchema = {
  projects: ProjectPropsSchema[];
  tags: ProjectTagsSchema[];
};

type ProjectTagsSchema = {
  name: string;
  projects: string[];
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

type ProjectWorkColors = Colors;

type ProjectWorkPropsContainerBase = {
  title: string;
  description: string;
  color: ProjectWorkColors;
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

db.defaults({ projects: [], tags: [] }).write();

export {
  ProjectWorkPropsContainer,
  ProjectWorkPropsContainerBase,
  ProjectPropsSchema,
  ProjectWorkListProps,
  ProjectWorkProps,
  ProjectTagsSchema,
  ProjectWorkColors,
  AppSchema,
};
export default db;
