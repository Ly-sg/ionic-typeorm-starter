import { Post } from '../entities/author/post';
import { DataSource } from 'typeorm';
import { SQLiteService } from '../services/sqlite.service';
import { initPosts1684256229265 } from '../migrations/1684256229265-initPosts';

const sqliteService = new SQLiteService();
const sqliteConnection = sqliteService.getSqliteConnection();

export default new DataSource({
  name: 'authorConnection',
  type: 'capacitor',
  driver: sqliteConnection,
  database: 'ionic-sqlite-posts',
  mode: 'no-encryption',
  entities: [Post],
  migrations: [initPosts1684256229265],
  subscribers: [],
  logging: [/*'query',*/ 'error', 'schema'],
  synchronize: false,
  migrationsRun: false,
});
