/* eslint-disable unicorn/no-process-exit */
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

dotenv.config();

const connectionString = process.env.DATABASE_URL ?? '';

const sql = postgres(connectionString, {
  max: 1,
  ssl: 'require',
});

const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
    await sql.end();

    console.log('Migration successful');
  } catch (error) {
    console.error(error);
    await sql.end();
    process.exit(1);
  }
};

void main();
