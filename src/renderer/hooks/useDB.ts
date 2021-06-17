import db from '../lib/lowdb';

export default function useFindProjectId(id: string) {
  return db.get('projects').find({ id }).value();
}
