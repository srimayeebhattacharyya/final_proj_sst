import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import 'reflect-metadata';
console.log('DB_CONNECTION:', process.env.DB_CONNECTION);
// we can't access configService directly here because this file is loaded before the AppModule
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_CONNECTION as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.js,.ts}'],
  migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
  // logging: true,
  // logging: 'all', //for sql queries logging
});
 