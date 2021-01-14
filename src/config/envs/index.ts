import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
export * from './app-envs';
export * from './database-envs';
