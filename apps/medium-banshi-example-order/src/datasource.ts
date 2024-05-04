import { DataSource } from 'typeorm';
import Order from './models/Order';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [Order],
  synchronize: true,
  logging: false
});

export default AppDataSource;
