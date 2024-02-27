/* eslint-disable unicorn/no-process-exit */
import Fastify from 'fastify';

import { db } from './db';

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = String(process.env.HOST) ?? '0.0.0.0';

const fastify = Fastify();

fastify.get('/', async function handler(_, reply) {
  try {
    const allUsers = await db.query.users.findMany();
    return {
      users: allUsers,
    };
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return reply
        .status(500)
        .send({ error: `"Something went wrong": ${error.message}` });
    }
  }
});

const startServer = async () => {
  try {
    await fastify.listen({ host: HOST, port: PORT });
    console.log(`Server listening on http://${HOST}:${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

void startServer();
