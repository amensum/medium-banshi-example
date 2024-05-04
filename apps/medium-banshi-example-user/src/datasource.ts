import { DataSource } from 'typeorm';
import User from './models/User';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [User],
  synchronize: true,
  logging: false
});

export default AppDataSource;
