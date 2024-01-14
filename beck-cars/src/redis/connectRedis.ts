import { createClient } from 'redis';
import * as dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const { REDIS_PASSWORD, REDIS_PORT, REDIS_HOST } = process.env;

export const client = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
});

export const connectToRedis = async () => {
  try {
    await client.connect();
    console.log(chalk.magenta('Connected to redis'));
  } catch (err) {
    console.log('Error connecting to Redis', err);
  }
};
