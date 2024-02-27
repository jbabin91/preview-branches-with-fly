/* eslint-disable sort-keys-fix/sort-keys-fix */
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: serial('id'),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  role: text('role').$type<'admin' | 'customer'>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isSubscribed: text('is_subscribed').default('true'),
});
