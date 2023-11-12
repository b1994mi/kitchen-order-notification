import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { PrepopulateFoods1699800061095 } from './1699800061095-PrepopulateFoods';

config({
  path: '.env',
});

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [PrepopulateFoods1699800061095],
});
