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
  works: ProjectGroupProps;
};

type ProjectGroupProps = {
  [key: string]: ProjectGroupPropsContainer;
};

type ProjectGroupColors = Colors;

type ProjectGroupPropsContainerBase = {
  title: string;
  description: string;
  color: ProjectGroupColors;
};

interface ProjectGroupPropsContainer extends ProjectGroupPropsContainerBase {
  id: string;
  list: ProjectGroupListProps[];
  moveTo?: string; // id where the item will be moved once checked as done or like that?
}

type ProjectGroupListProps = {
  id: string;
  title: string;
};

const adapter = new LocalStorage<AppSchema>('db');
const db = low(adapter);

db.defaults({ projects: [], tags: [] }).write();

export {
  ProjectGroupPropsContainer,
  ProjectGroupPropsContainerBase,
  ProjectPropsSchema,
  ProjectGroupListProps,
  ProjectGroupProps,
  ProjectTagsSchema,
  ProjectGroupColors,
  AppSchema,
};
export default db;
