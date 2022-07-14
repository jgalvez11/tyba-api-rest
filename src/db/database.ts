import { Pool } from 'pg';

/**
 * Pool de conexión a base de datos (POSTGRESQL)
 */
export const pool = new Pool({
  host: process.env.HOST_DB || 'localhost',
  user: process.env.USER_DB || 'postgres',
  password: process.env.PASSWORD_DB || 'test',
  database: process.env.DATABASE_NAME || 'tyba_api_rest',
  port: 5432
});
