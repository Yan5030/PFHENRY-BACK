import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {config as dotenvConfig} from 'dotenv';
//dotenv.config(); // Carga las variables de entorno desde el archivo .env
dotenvConfig({ path: '.env.development' });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || '1234',
  database: process.env.DATABASE_NAME || 'hogwarts_bar',
  autoLoadEntities:true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // entities : [ 'dist/**/*.entity{.ts,.js}' ]
  migrations: ['dist/migrations/*{.js,.ts}'],
  synchronize: true,
  logging: true,
};
