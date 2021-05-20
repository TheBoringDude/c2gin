import db from '../c2gin/lowdb';

export default function useFindProjectId(id: string) {
  return db.get('projects').find({ id }).value();
}
