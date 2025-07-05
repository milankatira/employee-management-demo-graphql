import IORedis from 'ioredis';
import { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } from '../utils/config';

if (!REDIS_HOST || !REDIS_PORT || !REDIS_USERNAME || !REDIS_PASSWORD) {
  throw new Error('Missing Redis environment variables. Please check your .env file or config.ts');
}

const redisConnection = new IORedis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT),
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

redisConnection.on('error', (err) => console.log('IORedis Client Error', err));
redisConnection.on('connect', () => console.log('Redis connection established'));

export default redisConnection;
