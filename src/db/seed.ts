/* eslint-disable unicorn/no-process-exit */
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from './schema';
import { count, sql } from 'drizzle-orm';
import * as schema from './schema';
import { faker } from '@faker-js/faker';

dotenv.config();

const connectionString = process.env.DATABASE_URL ?? '';

const sqlConnection = postgres(connectionString, {
  max: 1,
  ssl: 'require',
});

const db = drizzle(sqlConnection, { schema });

const main = async () => {
  try {
    const userData: (typeof users.$inferInsert)[] = [];

    const countUsers = await db
      .select({
        usersCount: sql<number>`cast(${count(users.id)} as int)`,
      })
      .from(users);

    if (countUsers[0]?.usersCount > 0) {
      throw new Error('Database is already seeded.');
    }

    for (let i = 0; i < 10; i++) {
      userData.push({
        name: faker.person.fullName(),
        displayName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.datatype.boolean(0.1) ? 'admin' : 'customer',
        isSubscribed: faker.datatype.boolean(),
      });
    }
    console.log('Seeding data');
    await db.insert(users).values(userData);
    await sqlConnection.end();
    console.log('Seeding successful');
  } catch (error) {
    console.error(error);
    await sqlConnection.end();
    process.exit(1);
  }
};

void main();
