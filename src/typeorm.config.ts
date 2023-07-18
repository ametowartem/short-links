import { UserEntity } from './user/user.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'rootroot',
  database: 'library',
  entities: [UserEntity],
  migrations: ['./src/migrations/*.ts'],
});
